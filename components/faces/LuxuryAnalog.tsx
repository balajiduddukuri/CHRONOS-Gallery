import React from 'react';
import { WatchProps } from '../../types';
import { getTimeParts } from '../../utils/timeMath';

export const LuxuryAnalog: React.FC<WatchProps> = ({ time, timezone }) => {
  const { hours, minutes, seconds, milliseconds } = getTimeParts(time, timezone);
  
  // Continuous movement math
  const smoothSeconds = seconds + milliseconds / 1000;
  const smoothMinutes = minutes + smoothSeconds / 60;
  const smoothHours = (hours % 12) + smoothMinutes / 60;

  const secDeg = smoothSeconds * 6;
  const minDeg = smoothMinutes * 6;
  const hourDeg = smoothHours * 30;

  return (
    <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-black p-1 relative ring-4 ring-silver-300 dark:ring-surface shadow-2xl">
      {/* Gold Bezel */}
      <div className="w-full h-full rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 p-[12px] shadow-lg">
        
        {/* Face with Sunburst Effect */}
        <div className="w-full h-full rounded-full relative overflow-hidden shadow-inner">
           
           {/* Sunburst Gradient: Conic gradient for the radial brushing effect, mixed with radial for depth */}
           <div 
             className="absolute inset-0" 
             style={{
               background: `
                 radial-gradient(circle at center, rgba(40,40,40,0.8), rgba(0,0,0,1)),
                 conic-gradient(from 0deg, #222 0deg, #444 45deg, #222 90deg, #444 135deg, #222 180deg, #444 225deg, #222 270deg, #444 315deg, #222 360deg)
               `,
               backgroundBlendMode: 'multiply'
             }}
           />

           {/* Minute Markers */}
           {Array.from({ length: 60 }).map((_, i) => (
             <div
               key={i}
               className={`absolute top-0 left-1/2 w-[1px] h-full -ml-[0.5px] ${i % 5 === 0 ? 'bg-gold-200 w-[2px] -ml-[1px] opacity-90' : 'bg-silver-600 opacity-40'}`}
               style={{ transform: `rotate(${i * 6}deg)` }}
             >
               <div className={`mt-[2px] ${i % 5 === 0 ? 'h-3' : 'h-1'}`} />
             </div>
           ))}

            {/* Roman Numerals */}
            {[12, 3, 6, 9].map((num) => {
                const roman = num === 12 ? 'XII' : num === 3 ? 'III' : num === 6 ? 'VI' : 'IX';
                return (
                    <div 
                        key={num}
                        className="absolute w-8 h-8 flex items-center justify-center text-gold-100 font-serif font-bold text-lg accent-text"
                        style={{
                            top: num === 12 ? '15%' : num === 6 ? '85%' : '50%',
                            left: num === 9 ? '15%' : num === 3 ? '85%' : '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {roman}
                    </div>
                )
            })}

           {/* Branding */}
           <div className="absolute top-[28%] left-1/2 -translate-x-1/2 text-center">
             <div className="text-gold-400 text-xl mb-1">♔</div>
             <div className="text-silver-200 font-serif text-[10px] tracking-[0.2em] font-bold">CHRONOS</div>
             <div className="text-gold-600 text-[8px] tracking-widest mt-0.5 uppercase">Certified</div>
           </div>

           {/* Hands */}
           {/* Hour */}
           <div 
             className="absolute top-1/2 left-1/2 w-1.5 h-16 -ml-[3px] -mt-16 bg-gradient-to-t from-gold-200 to-gold-600 rounded-full shadow-[0_5px_5px_rgba(0,0,0,0.5)] origin-bottom z-10"
             style={{ transform: `rotate(${hourDeg}deg)` }}
           />
           {/* Minute */}
           <div 
             className="absolute top-1/2 left-1/2 w-1 h-24 -ml-[2px] -mt-24 bg-gradient-to-t from-silver-100 to-silver-400 rounded-full shadow-[0_5px_5px_rgba(0,0,0,0.5)] origin-bottom z-20"
             style={{ transform: `rotate(${minDeg}deg)` }}
           />
           {/* Second */}
           <div 
             className="absolute top-1/2 left-1/2 w-0.5 h-28 -ml-[1px] -mt-24 bg-gold-400 origin-bottom z-30 flex flex-col items-center justify-end shadow-sm"
             style={{ transform: `rotate(${secDeg}deg)` }}
           >
             <div className="w-2 h-2 bg-gold-400 rounded-full -mb-1 shadow-md" />
             <div className="h-8 w-0.5 bg-gold-400 absolute top-full" /> 
           </div>

           {/* Center Pin */}
           <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full border border-gold-400 z-40" />
           
           {/* Glass Reflection */}
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full pointer-events-none" />
        </div>
      </div>
    </div>
  );
};