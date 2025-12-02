import React from 'react';
import { WatchProps } from '../../types';
import { getTimeParts } from '../../utils/timeMath';

export const Minimalist: React.FC<WatchProps> = ({ time, timezone }) => {
  const { hours, minutes, seconds } = getTimeParts(time, timezone);
  
  const minDeg = minutes * 6;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-full shadow-xl border-[12px] border-slate-100 dark:border-zinc-800 relative ring-1 ring-slate-200 dark:ring-zinc-700">
       {/* Dial */}
       <div className="absolute inset-0 rounded-full">
            {/* Major Cardinals */}
            {[0, 90, 180, 270].map((deg) => (
                <div 
                    key={deg}
                    className="absolute top-1/2 left-1/2 w-full h-[2px] -translate-y-1/2 bg-transparent pointer-events-none"
                    style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
                >
                    <div className="absolute right-0 top-0 w-5 h-full bg-slate-800 dark:bg-slate-200" />
                </div>
            ))}
            
            {/* Minor Indices */}
            {Array.from({ length: 12 }).map((_, i) => (
                <div 
                    key={i}
                    className="absolute top-1/2 left-1/2 w-full h-[1px] -translate-y-1/2 bg-transparent pointer-events-none"
                    style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}
                >
                    <div className="absolute right-0 top-0 w-2 h-full bg-slate-400 dark:bg-zinc-600" />
                </div>
            ))}
       </div>

       {/* Hands */}
       {/* Hour - Sleek stick */}
       <div 
         className="absolute top-1/2 left-1/2 w-1.5 h-16 -ml-[3px] -mt-16 bg-slate-900 dark:bg-white origin-bottom z-10"
         style={{ transform: `rotate(${hourDeg}deg)` }}
       />
       {/* Minute - Sleek stick */}
       <div 
         className="absolute top-1/2 left-1/2 w-1 h-24 -ml-[2px] -mt-24 bg-slate-600 dark:bg-silver-400 origin-bottom z-10"
         style={{ transform: `rotate(${minDeg}deg)` }}
       />
       
       {/* Second - Accent Dot orbiting */}
       <div 
        className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
        style={{ transform: `rotate(${seconds * 6}deg)` }}
       >
           <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-orange-500 rounded-full" />
       </div>

       {/* Center Cap */}
       <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-white rounded-full -translate-x-1/2 -translate-y-1/2 z-30" />
    </div>
  );
};