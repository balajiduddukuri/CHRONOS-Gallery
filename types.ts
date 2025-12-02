export interface TimeState {
  date: Date;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface AppSettings {
  timezone: string;
  isHighContrast: boolean;
  useDemoLocation: boolean; // For Sundial
  userLocation: Coordinates | null;
}

export interface WatchProps {
  time: Date;
  timezone: string;
  settings?: AppSettings;
}

export const AVAILABLE_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Asia/Dubai"
];