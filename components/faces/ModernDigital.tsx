import React from 'react';
import { WatchProps } from '../../types';

// Optimization: Move formatters outside component to prevent re-instantiation on every render
const getFormatters = (timezone: string) => {
  try {
    return {
      timeFmt: new Intl.DateTimeFormat('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone
      }),
      secondsFmt: new Intl.DateTimeFormat('en-US', {
        second: '2-digit',
        timeZone: timezone
      }),
      dateFmt: new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: timezone
      })
    };
  } catch (e) {
    // Fallback if timezone is invalid
    return {
        timeFmt: new Intl.DateTimeFormat('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        secondsFmt: new Intl.DateTimeFormat('en-US', { second: '2-digit' }),
        dateFmt: new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  }
};

export const ModernDigital: React.FC<WatchProps> = ({ time, timezone }) => {
  // We can treat formatters as light-weight enough to get by key, or useMemo if heavy. 
  // Given the limited set of zones, instant access is fine.
  const { timeFmt, secondsFmt, dateFmt } = getFormatters(timezone);

  const timeString = timeFmt.format(time);
  const secondsString = secondsFmt.format(time);
  const dateString = dateFmt.format(time).toUpperCase();

  const timeZoneShort = timezone.split('/')[1]?.replace('_', ' ') || 'UTC';

  return (
    <div className="w-full h-full bg-slate-900 rounded-[2rem] p-1 shadow-2xl ring-4 ring-slate-800">
      <div className="w-full h-full bg-black rounded-[1.8rem] flex flex-col items-center justify-center relative overflow-hidden border-4 border-slate-800">
        
        {/* OLED Grid Background - Pure black with subtle scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-30" 
             style={{ 
               background: `repeating-linear-gradient(
                 0deg,
                 transparent,
                 transparent 2px,
                 rgba(34, 211, 238, 0.05) 3px
               )`
             }} 
        />
        
        {/* Display */}
        <div className="z-10 flex flex-col items-center space-y-2 font-mono relative">
            {/* Glow effect behind text */}
            <div className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-full" />

            <div className="flex items-center space-x-2 text-cyan-500/80 text-[10px] tracking-[0.2em] mb-2 relative z-10">
               <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
               <span>{timeZoneShort}</span>
            </div>
            
            <div className="flex items-baseline space-x-2 relative z-10" aria-label={`Current time is ${timeString} and ${secondsString} seconds`}>
                <span className="text-6xl font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                    {timeString}
                </span>
                <span className="text-2xl text-cyan-400 font-light w-[40px] drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                    {secondsString}
                </span>
            </div>

            {/* Separator Line */}
            <div className="w-32 h-[1px] bg-slate-800 my-4 relative overflow-hidden z-10">
                <div className="absolute inset-0 bg-cyan-500/50 w-full animate-[shimmer_2s_infinite]" />
            </div>

            <div className="flex items-center space-x-4 text-slate-500 text-sm relative z-10">
                <span className="bg-slate-900/80 border border-slate-700 px-3 py-1 rounded text-cyan-200 shadow-inner backdrop-blur-sm">
                  {dateString}
                </span>
            </div>
        </div>

        {/* Screen Glare - enhanced */}
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-b from-white/5 via-transparent to-transparent rotate-45 pointer-events-none mix-blend-overlay" />
      </div>
    </div>
  );
};