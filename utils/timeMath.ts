/**
 * Parses a Date object into numeric H, M, S, MS parts for a specific timezone.
 * Needed because Date.getHours() returns local system time.
 */
export const getTimeParts = (date: Date, timeZone: string) => {
  // Use Intl to get parts
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    // fractionalSecondDigits removed as it causes TS error and result is unused (ms accessed via date.getMilliseconds())
    hour12: false,
    timeZone,
  });

  const parts = formatter.formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes) => {
    const p = parts.find(p => p.type === type);
    return p ? parseInt(p.value, 10) : 0;
  };

  return {
    hours: getPart('hour') % 24,
    minutes: getPart('minute'),
    seconds: getPart('second'),
    // Milliseconds are independent of timezone for a specific instant
    milliseconds: date.getMilliseconds(), 
  };
};

/**
 * Formats a duration in milliseconds to MM:SS.mmm or HH:MM:SS.mmm
 */
export const formatDuration = (ms: number): string => {
  // Ensure we are working with an integer for calculations to avoid floating point rendering issues
  const msInt = Math.floor(ms);
  
  const minutes = Math.floor(msInt / 60000);
  const seconds = Math.floor((msInt % 60000) / 1000);
  const milliseconds = msInt % 1000;
  const hours = Math.floor(minutes / 60);
  
  const pad = (n: number, z: number = 2) => n.toString().padStart(z, '0');
  const padMs = (n: number) => n.toString().padStart(3, '0');

  if (hours > 0) {
      return `${pad(hours)}:${pad(minutes % 60)}:${pad(seconds)}.${padMs(milliseconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}.${padMs(milliseconds)}`;
};

/**
 * Calculates the shadow angle for a horizontal sundial.
 * Formula: tan(θ) = sin(Lat) * tan(HA)
 * 
 * @param date The current date/time
 * @param timeZone The timezone of the location (to calculate Solar Time approximation)
 * @param latitude Latitude in degrees
 * @param longitude Longitude in degrees (optional for simple offset)
 */
export const calculateSundialShadow = (
  date: Date, 
  latitude: number, 
  inputHours: number,
  inputMinutes: number
): number => {
  // 1. Calculate Local Solar Time (decimal hours)
  // For this visual component, we treat the Clock Time as Solar Time to make it intuitive for the user
  const solarTime = inputHours + (inputMinutes / 60);

  // 2. Calculate Hour Angle (H) in degrees.
  // Noon (12:00) is 0 degrees. Morning is negative. 15 degrees per hour.
  const H_deg = (solarTime - 12) * 15;
  const H_rad = H_deg * (Math.PI / 180);
  
  // 3. Convert Latitude to radians
  const lat_rad = latitude * (Math.PI / 180);

  // 4. Calculate Shadow Angle (Theta) from the noon line (vertical)
  // tan(θ) = sin(Lat) * tan(H)
  const tanTheta = Math.sin(lat_rad) * Math.tan(H_rad);
  let theta_rad = Math.atan(tanTheta);
  let theta_deg = theta_rad * (180 / Math.PI);

  return theta_deg;
};