import React from 'react';
import { WatchProps } from '../../types';
import { getTimeParts } from '../../utils/timeMath';

export const RolexStyle: React.FC<WatchProps> = ({ time, timezone }) => {
  const { hours, minutes, seconds } = getTimeParts(time, timezone);
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minDeg = minutes * 6;
  const secDeg = seconds * 6;
  
  const dateNum = new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone: timezone }).format(time);

  return (
    <div className="w-full h-full rounded-full bg-silver-300 shadow-2xl relative flex items-center justify-center p-1 ring-2 ring-silver-400">
      {/* Diver Bezel */}
      <div className="w-full h-full rounded-full bg-black border-[6px] border-silver-300 relative shadow-lg box-border">
          {/* Bezel Insert markings */}
          <div className="absolute inset-0 rounded-full border-[10px] border-rolex-dim">
             {/* Triangle at 12 */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[2px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white z-10 drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]"></div>
             {/* 10, 20, 30, 40, 50 */}
             {[10, 20, 30, 40, 50].map(n => (
                 <div key={n} className="absolute text-[8px] font-bold text-white tracking-widest" 
                 style={{ 
                     top: '50%', left: '50%', 
                     transform: `translate(-50%, -50%) rotate(${n * 6}deg) translateY(-44%) rotate(${-n*6}deg)` 
                 }}>{n}</div>
             ))}
             {/* Minute hashes for first 15m */}
             {Array.from({length: 15}).map((_, i) => (
                  <div key={i} className="absolute top-1/2 left-1/2 w-[1px] h-full bg-transparent" style={{ transform: `translate(-50%, -50%) rotate(${i * 6}deg)` }}>
                      <div className="w-[1px] h-[3px] bg-white absolute top-[2px] left-1/2 -translate-x-1/2"></div>
                  </div>
             ))}
          </div>

          {/* Dial */}
          <div className="absolute inset-[14px] bg-black rounded-full shadow-inner border border-slate-800">
                {/* Lume Indices */}
                {Array.from({ length: 12 }).map((_, i) => {
                    const isCardinal = i % 3 === 0;
                    if (i === 3) return null; // Date window
                    return (
                        <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full pointer-events-none" style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}>
                            <div className={`absolute top-[6%] left-1/2 -translate-x-1/2 ${i===0 ? 'w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-white' : isCardinal ? 'w-1.5 h-4 bg-white border border-silver-300' : 'w-2.5 h-2.5 rounded-full bg-white border border-silver-300'} shadow-[0_0_2px_rgba(255,255,255,0.8)]`}></div>
                        </div>
                    )
                })}

                {/* Date Window with Cyclops */}
                <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-5 h-4 bg-white rounded-[1px] flex items-center justify-center border border-slate-300 z-0">
                     <span className="text-[10px] font-bold text-black font-sans">{dateNum}</span>
                </div>
                {/* Cyclops Lens Simulation */}
                <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-7 h-5 bg-gradient-to-br from-white/30 to-transparent rounded-lg backdrop-blur-[0.5px] scale-125 border border-white/20 shadow-lg z-50 pointer-events-none opacity-80 mix-blend-hard-light"></div>

                {/* Branding */}
                <div className="absolute top-[25%] w-full text-center">
                    <div className="text-gold-400 text-xs">♛</div>
                    <div className="text-white text-[8px] font-serif font-bold tracking-widest mt-0.5">OYSTER</div>
                    <div className="text-silver-500 text-[6px] font-sans tracking-wide mt-0.5">PERPETUAL</div>
                </div>
                
                {/* Hands */}
                {/* Hour (Mercedes) */}
                <div className="absolute top-1/2 left-1/2 w-1.5 h-14 bg-silver-200 -translate-x-1/2 -translate-y-full origin-bottom z-20 flex flex-col justify-end pb-1 drop-shadow-lg" style={{ transform: `translate(-50%, -50%) rotate(${hourDeg}deg)` }}>
                    <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-silver-200 mb-2 relative bg-black/20 mx-auto">
                         {/* Mercedes logo approx */}
                         <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[1px] h-[5px] bg-silver-200"></div>
                         <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[5px] h-[1px] bg-silver-200 rotate-[30deg] origin-center"></div>
                         <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[5px] h-[1px] bg-silver-200 -rotate-[30deg] origin-center"></div>
                    </div>
                </div>
                
                {/* Minute */}
                <div className="absolute top-1/2 left-1/2 w-1 h-20 bg-silver-200 -translate-x-1/2 -translate-y-full origin-bottom z-30 drop-shadow-lg" style={{ transform: `translate(-50%, -50%) rotate(${minDeg}deg)` }}>
                    <div className="w-0.5 h-16 bg-white mx-auto mt-1 opacity-80"></div>
                </div>

                {/* Second (Lollipop) */}
                <div className="absolute top-1/2 left-1/2 w-[1px] h-20 bg-silver-200 -translate-x-1/2 -translate-y-full origin-bottom z-40 flex flex-col items-center justify-start drop-shadow-md" style={{ transform: `translate(-50%, -50%) rotate(${secDeg}deg)` }}>
                    <div className="w-2 h-2 bg-silver-200 rounded-full mt-4 shadow-sm border border-slate-400"></div>
                </div>

                {/* Center Pin */}
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-silver-300 rounded-full -translate-x-1/2 -translate-y-1/2 z-50 border border-slate-500"></div>
          </div>
      </div>
    </div>
  )
}