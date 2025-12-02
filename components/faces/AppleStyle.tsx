import React from 'react';
import { WatchProps } from '../../types';
import { getTimeParts } from '../../utils/timeMath';

export const AppleStyle: React.FC<WatchProps> = ({ time, timezone }) => {
  const timeString = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: false, timeZone: timezone }).format(time);
  const dateString = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric', timeZone: timezone }).format(time).toUpperCase();

  // Simulated activity progress based on time of day, respecting timezone
  const { hours } = getTimeParts(time, timezone);
  const moveProgress = Math.min((hours / 24) * 100, 100);
  const exerciseProgress = Math.min((hours / 12) * 100, 80);
  const standProgress = Math.min((hours / 18) * 100, 90);

  // Dash calculations for circles (C = 2*pi*r)
  const r1 = 40, c1 = 2 * Math.PI * r1;
  const r2 = 28, c2 = 2 * Math.PI * r2;
  const r3 = 16, c3 = 2 * Math.PI * r3;

  return (
    <div className="w-full h-full bg-black rounded-[2.5rem] p-1.5 shadow-2xl ring-4 ring-slate-800 flex items-center justify-center">
       {/* Screen housing */}
       <div className="w-full h-full bg-black rounded-[2.2rem] relative overflow-hidden flex flex-col justify-between p-5 border border-slate-800/50">
           
           {/* Top Row: Date & Time */}
           <div className="flex justify-between items-start z-10">
               <div className="text-orange-500 font-sans text-xs font-semibold tracking-wide uppercase">
                   {dateString}
               </div>
               <div className="text-slate-100 font-sans text-4xl font-light tracking-tight tabular-nums">
                   {timeString}
               </div>
           </div>

           {/* Center: Rings (Simulated) */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
               <svg viewBox="0 0 100 100" className="transform -rotate-90 drop-shadow-lg">
                   {/* Move Ring (Red) */}
                   <circle cx="50" cy="50" r={r1} stroke="#331111" strokeWidth="8" fill="none" />
                   <circle cx="50" cy="50" r={r1} stroke="#fa114f" strokeWidth="8" fill="none" strokeDasharray={c1} strokeDashoffset={c1 - (c1 * moveProgress) / 100} strokeLinecap="round" />
                   
                   {/* Exercise Ring (Green) */}
                   <circle cx="50" cy="50" r={r2} stroke="#113311" strokeWidth="8" fill="none" />
                   <circle cx="50" cy="50" r={r2} stroke="#92e627" strokeWidth="8" fill="none" strokeDasharray={c2} strokeDashoffset={c2 - (c2 * exerciseProgress) / 100} strokeLinecap="round" />

                   {/* Stand Ring (Blue) */}
                   <circle cx="50" cy="50" r={r3} stroke="#111133" strokeWidth="8" fill="none" />
                   <circle cx="50" cy="50" r={r3} stroke="#00d9f9" strokeWidth="8" fill="none" strokeDasharray={c3} strokeDashoffset={c3 - (c3 * standProgress) / 100} strokeLinecap="round" />
               </svg>
           </div>

           {/* Bottom: Complication (Weather mock) */}
           <div className="flex justify-between items-end z-10">
               <div className="flex flex-col">
                   <span className="text-[10px] text-slate-400 font-medium">CUPERTINO</span>
                   <span className="text-xl text-white font-medium">72°</span>
               </div>
               <div className="flex flex-col items-end gap-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-300 to-orange-500 shadow-[0_0_10px_rgba(255,165,0,0.5)]" title="Sunny"></div>
                    <span className="text-[10px] text-slate-400">Sunny</span>
               </div>
           </div>

           {/* Glass Glare */}
           <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-[2.5rem]"></div>
       </div>
    </div>
  )
}