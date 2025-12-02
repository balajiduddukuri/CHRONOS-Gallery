import React, { useState } from 'react';
import { WatchProps } from '../../types';
import { getTimeParts } from '../../utils/timeMath';

export const RolexStyle: React.FC<WatchProps> = ({ time, timezone }) => {
  const { hours, minutes, seconds } = getTimeParts(time, timezone);
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minDeg = minutes * 6;
  const secDeg = seconds * 6;
  
  // Diver bezel state - unidirectional rotation
  const [bezelOffset, setBezelOffset] = useState(0);

  const handleBezelClick = () => {
    // Rotate counter-clockwise by 2.5 minutes (15 degrees) per click
    setBezelOffset(prev => prev - 15);
  };
  
  const dateNum = new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone: timezone }).format(time);

  return (
    <div className="w-full h-full rounded-full bg-silver-200 shadow-2xl relative flex items-center justify-center p-0.5 ring-4 ring-silver-300">
      {/* Case Lugs visual simulation (subtle gradients on outer ring) */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-silver-100 to-silver-400"></div>

      {/* Diver Bezel - Interactive */}
      <div 
        className="w-[96%] h-[96%] rounded-full bg-rolex-dim border-[2px] border-silver-400 relative shadow-[0_4px_10px_rgba(0,0,0,0.4)] box-border cursor-pointer transition-transform duration-300 ease-out active:scale-[0.99]"
        onClick={handleBezelClick}
        title="Click to rotate bezel"
        style={{ transform: `rotate(${bezelOffset}deg)` }}
        role="button"
        aria-label="Rotating Green Ceramic Bezel"
      >
          {/* Bezel Insert - Ceramic Green */}
          <div className="absolute inset-0 rounded-full border-[14px] border-rolex shadow-inner">
             {/* Serrated Edge Visual */}
             <div className="absolute -inset-[2px] rounded-full border-[2px] border-dashed border-silver-400/50 opacity-50 pointer-events-none"></div>

             {/* Triangle at 12 with Lume Pip */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[6px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[10px] border-b-gold-100 z-10 drop-shadow-md"></div>
             <div className="absolute top-[2px] left-1/2 -translate-x-1/2 -translate-y-[4px] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)] z-20 border border-gold-300"></div>

             {/* Numerals 10, 20, 30, 40, 50 in Gold */}
             {[10, 20, 30, 40, 50].map(n => (
                 <div key={n} className="absolute text-[9px] font-bold text-gold-200 tracking-widest font-sans" 
                 style={{ 
                     top: '50%', left: '50%', 
                     transform: `translate(-50%, -50%) rotate(${n * 6}deg) translateY(-52px) rotate(${-n*6}deg)` 
                 }}>{n}</div>
             ))}
             
             {/* Minute hashes for first 15m in Gold */}
             {Array.from({length: 15}).map((_, i) => (
                  <div key={i} className="absolute top-1/2 left-1/2 w-[1px] h-full bg-transparent" style={{ transform: `translate(-50%, -50%) rotate(${i * 6}deg)` }}>
                      <div className="w-[1.5px] h-[3px] bg-gold-200 absolute top-[2px] left-1/2 -translate-x-1/2"></div>
                  </div>
             ))}

             {/* Remaining 5-min markers */}
             {Array.from({length: 60}).map((_, i) => {
               if (i <= 15 || i % 5 !== 0) return null;
               return (
                  <div key={i} className="absolute top-1/2 left-1/2 w-[1px] h-full bg-transparent" style={{ transform: `translate(-50%, -50%) rotate(${i * 6}deg)` }}>
                      <div className="w-[1.5px] h-[3px] bg-gold-200 absolute top-[2px] left-1/2 -translate-x-1/2"></div>
                  </div>
               )
             })}
          </div>

          {/* Dial - Static inside rotating bezel */}
          <div 
            className="absolute inset-[14px] rounded-full shadow-inner border-[1px] border-gold-600/30 overflow-hidden"
            style={{ 
              transform: `rotate(${-bezelOffset}deg)`, // Counter-rotate dial
              background: `
                radial-gradient(circle at center, #006039 0%, #002a1a 100%)
              ` 
            }}
          >
                {/* Sunburst Texture */}
                <div 
                  className="absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.1) 10deg, transparent 20deg, rgba(255,255,255,0.1) 30deg, transparent 40deg, rgba(255,255,255,0.1) 50deg, transparent 60deg, rgba(255,255,255,0.1) 70deg, transparent 80deg, rgba(255,255,255,0.1) 90deg, transparent 100deg, rgba(255,255,255,0.1) 110deg, transparent 120deg, rgba(255,255,255,0.1) 130deg, transparent 140deg, rgba(255,255,255,0.1) 150deg, transparent 160deg, rgba(255,255,255,0.1) 170deg, transparent 180deg)`
                  }}
                />

                {/* Minute Track */}
                {Array.from({ length: 60 }).map((_, i) => (
                  <div key={i} 
                    className={`absolute top-0 left-1/2 w-[0.5px] h-[3px] bg-gold-400/60 ${i % 5 === 0 ? 'h-[5px] bg-gold-200' : ''}`}
                    style={{ transform: `translateX(-50%) rotate(${i * 6}deg)`, transformOrigin: '50% 115px' }}
                  />
                ))}

                {/* Lume Indices (Gold Surrounds) */}
                {Array.from({ length: 12 }).map((_, i) => {
                    const isCardinal = i % 3 === 0;
                    if (i === 3) return null; // Date window
                    return (
                        <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full pointer-events-none" style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}>
                            <div className={`absolute top-[8%] left-1/2 -translate-x-1/2 shadow-lg z-10 
                                ${i===0 
                                  ? 'w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-white drop-shadow-[0_0_1px_#d4af37]' 
                                  : isCardinal 
                                    ? 'w-2 h-5 bg-white border-[1.5px] border-gold-300 rounded-[1px]' 
                                    : 'w-3 h-3 rounded-full bg-white border-[1.5px] border-gold-300'
                                }`}>
                                {/* Triangle Gold Border fix */}
                                {i===0 && <div className="absolute top-[1px] -left-[6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[11px] border-b-gold-300 -z-10"></div>}
                            </div>
                        </div>
                    )
                })}

                {/* Date Window with Cyclops */}
                <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-7 h-5 bg-white rounded-[2px] flex items-center justify-center border border-gold-200 z-0 shadow-inner">
                     <span className="text-[11px] font-bold text-black font-sans tracking-tighter">{dateNum}</span>
                </div>
                {/* Cyclops Lens */}
                <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-9 h-6 bg-gradient-to-br from-white/40 to-transparent rounded-lg backdrop-blur-[1px] scale-125 border border-white/30 shadow-xl z-50 pointer-events-none opacity-90 mix-blend-hard-light"></div>

                {/* Branding */}
                <div className="absolute top-[22%] w-full text-center z-0">
                    <div className="text-gold-300 text-sm mb-0.5 drop-shadow-sm">♕</div>
                    <div className="text-white text-[9px] font-serif font-bold tracking-widest leading-none drop-shadow-md">CHRONOS</div>
                    <div className="text-gold-200/80 text-[7px] font-sans tracking-[0.2em] mt-1">PERPETUAL</div>
                </div>
                
                {/* Text Bottom */}
                <div className="absolute bottom-[22%] w-full text-center z-0">
                    <div className="text-white text-[7px] font-sans tracking-widest leading-tight">
                        SUPERLATIVE CHRONOMETER<br/>
                        <span className="text-[6px] text-gold-200 opacity-80">OFFICIALLY CERTIFIED</span>
                    </div>
                </div>

                {/* Hands */}
                {/* Hour (Mercedes) - Gold */}
                <div className="absolute top-1/2 left-1/2 w-2 h-16 bg-gold-300 -translate-x-1/2 -translate-y-full origin-bottom z-20 flex flex-col justify-end pb-1.5 shadow-[2px_2px_4px_rgba(0,0,0,0.5)]" style={{ transform: `translate(-50%, -50%) rotate(${hourDeg}deg)` }}>
                    <div className="w-4 h-4 rounded-full border-[1.5px] border-gold-300 mb-2 relative bg-white mx-auto">
                         {/* Mercedes logo */}
                         <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[1px] h-[5px] bg-gold-300"></div>
                         <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[5px] h-[1px] bg-gold-300 rotate-[30deg] origin-center"></div>
                         <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[5px] h-[1px] bg-gold-300 -rotate-[30deg] origin-center"></div>
                    </div>
                </div>
                
                {/* Minute - Gold */}
                <div className="absolute top-1/2 left-1/2 w-1.5 h-24 bg-gold-300 -translate-x-1/2 -translate-y-full origin-bottom z-30 shadow-[2px_2px_4px_rgba(0,0,0,0.5)]" style={{ transform: `translate(-50%, -50%) rotate(${minDeg}deg)` }}>
                    <div className="w-[3px] h-20 bg-white mx-auto mt-1 opacity-90"></div>
                </div>

                {/* Second (Lollipop) - Gold */}
                <div className="absolute top-1/2 left-1/2 w-[1px] h-24 bg-gold-400 -translate-x-1/2 -translate-y-full origin-bottom z-40 flex flex-col items-center justify-start drop-shadow-md" style={{ transform: `translate(-50%, -50%) rotate(${secDeg}deg)` }}>
                    <div className="w-2.5 h-2.5 bg-gold-400 rounded-full mt-5 shadow-sm border border-gold-200/50">
                        <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-[1px]"></div>
                    </div>
                </div>

                {/* Center Pin */}
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gold-300 rounded-full -translate-x-1/2 -translate-y-1/2 z-50 border border-gold-500 shadow-sm"></div>
          </div>
      </div>
    </div>
  )
}