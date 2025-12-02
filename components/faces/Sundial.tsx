import React from 'react';
import { WatchProps } from '../../types';
import { getTimeParts, calculateSundialShadow } from '../../utils/timeMath';

export const Sundial: React.FC<WatchProps> = ({ time, timezone, settings }) => {
  const { hours, minutes } = getTimeParts(time, timezone);
  
  // Use actual location or default/demo
  const latitude = settings?.userLocation?.latitude ?? (settings?.useDemoLocation ? 45 : 40.71); // Default to NY lat approx
  
  // Is Day check (Simple 6am-6pm for visual purposes, or calculate sunrise/set)
  // For the visual component, we show the shadow if between 6:00 and 18:00 solar time roughly
  const totalMinutes = hours * 60 + minutes;
  const isDay = totalMinutes >= 360 && totalMinutes <= 1080;

  // Calculate physics-based shadow angle
  // If night, we can either hide shadow or show a "moon" shadow (ghostly)
  const shadowAngle = calculateSundialShadow(time, latitude, hours, minutes);

  return (
    <div className="w-full h-full rounded-full bg-stone-200 dark:bg-stone-900 shadow-2xl relative overflow-hidden border-8 border-stone-300 dark:border-stone-800">
      
      {/* Texture */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay filter contrast-125 bg-noise" />

      {/* Dial Markings */}
      {/* Noon (12) is Top (0 deg offset from vertical if strictly defined, but usually sundials align noon to True North) */}
      {/* For a horizontal dial, noon line is North-South. Shadow falls North at noon (in N Hemisphere). */}
      {/* We represent 'Top' as Noon for UI clarity. */}
      
      {Array.from({ length: 13 }).map((_, i) => {
          // Markings for 6am (06) to 6pm (18)
          const markHour = i + 6;
          // Calculate where the mark should be based on the same formula but fixed hour
          const markAngle = calculateSundialShadow(time, latitude, markHour, 0);
          
          return (
            <div 
                key={i} 
                className="absolute top-1/2 left-1/2 w-full h-[1px] -translate-y-1/2 origin-center pointer-events-none" 
                style={{ transform: `rotate(${markAngle}deg)` }}
            >
                {/* The Mark */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 flex flex-col items-center">
                    <span className="text-[9px] font-serif font-bold text-stone-600 dark:text-stone-400 transform rotate-180">
                        {markHour === 12 ? 'XII' : markHour}
                    </span>
                    <div className="w-[1px] h-2 bg-stone-400 dark:bg-stone-600 mt-1" />
                </div>
            </div>
          )
      })}

      {/* Center Gnomon Base */}
      <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-gold-600 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg z-20 border-2 border-gold-400 flex items-center justify-center">
          <div className="w-1 h-1 bg-black rounded-full opacity-50" />
      </div>
      
      {/* The Shadow */}
      {isDay ? (
          <div 
            className="absolute top-1/2 left-1/2 w-[2px] h-[45%] bg-blue-900/40 dark:bg-black/80 blur-[2px] origin-top z-10 transition-transform duration-700 ease-out rounded-full"
            style={{ 
                transform: `rotate(${shadowAngle + 180}deg)`, // Shadow is opposite to sun
            }}
          />
      ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-30 backdrop-blur-[1px]">
              <span className="text-stone-300 font-serif tracking-widest text-xs border border-stone-500 px-3 py-1 rounded">NIGHT</span>
          </div>
      )}
      
      {/* Metadata */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-500 dark:text-stone-600 font-sans text-[8px] tracking-[0.2em] uppercase text-center w-full">
        Lat: {latitude.toFixed(1)}°
        <br/>
        <span className="text-[6px] opacity-70">Solar Apparent Time</span>
      </div>
    </div>
  );
};