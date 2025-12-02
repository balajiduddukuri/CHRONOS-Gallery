import React from 'react';
import { WatchProps } from '../../types';

export const ModernDigital: React.FC<WatchProps> = ({ time, timezone }) => {
  // Use Intl for formatted strings
  const timeString = new Intl.DateTimeFormat('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone
  }).format(time);

  const secondsString = new Intl.DateTimeFormat('en-US', {
    second: '2-digit',
    timeZone: timezone
  }).format(time);

  const dateString = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: timezone
  }).format(time).toUpperCase();

  const timeZoneShort = timezone.split('/')[1]?.replace('_', ' ') || 'UTC';

  return (
    <div className="w-full h-full bg-slate-900 rounded-[2rem] p-1 shadow-2xl ring-4 ring-slate-800">
      <div className="w-full h-full bg-black rounded-[1.8rem] flex flex-col items-center justify-center relative overflow-hidden border-4 border-slate-800">
        
        {/* Retro Grid Background */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '20px 20px' 
             }} 
        />
        
        {/* Display */}
        <div className="z-10 flex flex-col items-center space-y-2 font-mono">
            <div className="flex items-center space-x-2 text-cyan-500/80 text-[10px] tracking-[0.2em] mb-2">
               <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
               <span>{timeZoneShort}</span>
            </div>
            
            <div className="flex items-baseline space-x-2" aria-label={`Current time is ${timeString} and ${secondsString} seconds`}>
                <span className="text-6xl font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    {timeString}
                </span>
                <span className="text-2xl text-cyan-400 font-light w-[40px]">
                    {secondsString}
                </span>
            </div>

            {/* Separator Line */}
            <div className="w-32 h-[1px] bg-slate-800 my-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/50 w-full animate-[shimmer_2s_infinite]" />
            </div>

            <div className="flex items-center space-x-4 text-slate-500 text-sm">
                <span className="bg-slate-900/50 border border-slate-800 px-3 py-1 rounded text-cyan-200 shadow-inner">
                  {dateString}
                </span>
            </div>
        </div>

        {/* Screen Glare */}
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-b from-white/5 to-transparent rotate-45 pointer-events-none" />
      </div>
    </div>
  );
};