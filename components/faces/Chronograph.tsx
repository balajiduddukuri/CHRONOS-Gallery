import React from 'react';
import { WatchProps } from '../../types';
import { getTimeParts } from '../../utils/timeMath';

export const Chronograph: React.FC<WatchProps> = ({ time, timezone }) => {
  const { hours, minutes, seconds, milliseconds } = getTimeParts(time, timezone);
  const smoothSeconds = seconds + milliseconds / 1000;
  
  // Hands
  const hourDeg = ((hours % 12) * 30) + (minutes / 2);
  const minDeg = minutes * 6;
  const sweepDeg = smoothSeconds * 6; // Main central second hand often static on chronos, but moving for demo
  
  // Sub-dials
  // Top: 24h
  const sub24Deg = ((hours * 60 + minutes) / 1440) * 360;
  // Left: Running Seconds (small)
  const subSecDeg = smoothSeconds * 6;
  // Bottom: 30m counter (mocked relative to minutes)
  const subMinDeg = (minutes % 30) * 12;

  return (
    <div className="w-full h-full rounded-full bg-silver-200 shadow-2xl border-4 border-silver-400 relative overflow-hidden group">
        
        {/* Tachymeter Bezel */}
        <div className="absolute inset-0 border-[24px] border-slate-900 rounded-full z-10">
             <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] text-white font-bold tracking-widest">TACHYMETRE</div>
        </div>

        {/* Dial Face */}
        <div className="absolute inset-[24px] rounded-full bg-[#e8e8e8] shadow-inner">
            
            {/* Sub Dials */}
            {/* Top - 24H */}
            <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-silver-300 bg-silver-100 shadow-inner">
                 <div className="absolute inset-0 flex items-center justify-center">
                    {/* Tick marks would go here */}
                    <div className="w-0.5 h-6 bg-slate-800 origin-bottom mb-6" style={{ transform: `rotate(${sub24Deg}deg)` }} />
                    <div className="w-1.5 h-1.5 bg-silver-400 rounded-full absolute" />
                 </div>
            </div>

            {/* Left - Running Seconds */}
            <div className="absolute top-1/2 left-[22%] -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full border border-silver-300 bg-slate-800 shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-5 bg-white origin-bottom mb-5" style={{ transform: `rotate(${subSecDeg}deg)` }} />
                    <div className="w-1 h-1 bg-silver-500 rounded-full absolute" />
                </div>
            </div>

            {/* Bottom - Minute Counter */}
            <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border border-silver-300 bg-silver-100 shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-5 bg-slate-800 origin-bottom mb-5" style={{ transform: `rotate(${subMinDeg}deg)` }} />
                    <div className="w-1.5 h-1.5 bg-silver-400 rounded-full absolute" />
                </div>
            </div>

            {/* Branding */}
            <div className="absolute top-[50%] right-[12%] w-24 text-right transform -translate-y-1/2">
                <span className="block font-sans font-bold text-slate-900 text-[9px] tracking-tighter">GRAND PRIX</span>
                <span className="block font-serif italic text-slate-500 text-[8px]">Automatic</span>
            </div>

             {/* Main Hour Indices */}
             {Array.from({ length: 12 }).map((_, i) => (
                <div 
                    key={i} 
                    className="absolute inset-0" 
                    style={{ transform: `rotate(${i * 30}deg)` }}
                >
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-slate-800 shadow-[1px_1px_2px_rgba(0,0,0,0.2)]" />
                </div>
            ))}

            {/* Main Hands */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                {/* Hour */}
                <div className="absolute w-2 h-14 bg-slate-700 -mt-14 origin-bottom shadow-md clip-sword" style={{ transform: `rotate(${hourDeg}deg)` }} />
                {/* Minute */}
                <div className="absolute w-1.5 h-20 bg-slate-700 -mt-20 origin-bottom shadow-md clip-sword" style={{ transform: `rotate(${minDeg}deg)` }} />
                
                {/* Chrono Sweep Seconds (Red) */}
                <div className="absolute w-[1px] h-24 bg-red-700 -mt-20 origin-bottom shadow-sm z-30" style={{ transform: `rotate(${sweepDeg}deg)` }}>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-700 rounded-full" />
                </div>
                
                {/* Center Pin */}
                <div className="absolute w-2.5 h-2.5 bg-silver-300 rounded-full border border-slate-500 z-40" />
            </div>
        </div>
        
        {/* Glass Glare */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
    </div>
  );
};