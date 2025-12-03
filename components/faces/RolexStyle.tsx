import React, { useState } from 'react';
import { WatchProps } from '../../types';
import { getTimeParts } from '../../utils/timeMath';

export const RolexStyle: React.FC<WatchProps> = ({ time, timezone }) => {
  const { hours, minutes, seconds } = getTimeParts(time, timezone);
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minDeg = minutes * 6;
  const secDeg = seconds * 6;

  // Diver bezel state - unidirectional rotation (click to rotate)
  const [bezelOffset, setBezelOffset] = useState(0);

  const handleBezelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBezelOffset(prev => prev - 15);
  };

  const dateNum = new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone: timezone }).format(time);

  return (
    // Container with Hover Zoom
    <div className="w-full h-full rounded-full bg-silver-300 shadow-2xl relative flex items-center justify-center p-[2px] ring-1 ring-silver-400 group transition-transform duration-500 hover:scale-[1.02]">
      
      {/* Case (Oyster Steel/Gold) - Brushed texture */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-silver-200 via-silver-100 to-silver-300 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]"></div>

      {/* Serrated Bezel Edge (Static Base) */}
      <div className="absolute inset-1 rounded-full border-[2px] border-silver-400 bg-silver-300">
         {/* CSS Pattern for serrations */}
         <div className="w-full h-full rounded-full" 
              style={{
                background: `conic-gradient(
                  #bdbdbd 0deg, #f5f5f5 1deg, #bdbdbd 2deg, 
                  transparent 2.1deg
                )`,
                backgroundSize: '100% 100%',
                maskImage: 'radial-gradient(transparent 68%, black 70%)'
              }}>
         </div>
      </div>

      {/* Ambient Rotation Wrapper for Bezel */}
      <div className="absolute inset-[2px] flex items-center justify-center animate-spin-slow z-10 pointer-events-none">
          {/* Rotating Bezel Ring (Interactive) */}
          <div 
            className="w-[92%] h-[92%] rounded-full relative shadow-lg cursor-pointer transition-transform duration-300 ease-out pointer-events-auto"
            onClick={handleBezelClick}
            style={{ transform: `rotate(${bezelOffset}deg)` }}
            title="Uni-directional Bezel"
          >
            {/* Ceramic Insert (Green) */}
            <div className="absolute inset-0 rounded-full bg-rolex-dim border-[1px] border-gold-400 overflow-hidden shadow-inner ring-1 ring-gold-600/50">
                {/* Gloss Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20 pointer-events-none"></div>
                
                {/* Bezel Markers */}
                {/* Triangle at 12 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-1 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-gold-200 drop-shadow-sm"></div>
                {/* Pearl (Lume Pip) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-[5px] w-2 h-2 bg-white rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] border border-gold-300 z-10"></div>

                {/* Engraved Numerals & Hashes */}
                <div className="absolute inset-0 font-sans font-bold text-gold-200">
                    {[10, 20, 30, 40, 50].map(n => (
                      <div key={n} className="absolute top-1/2 left-1/2 text-[10px] tracking-widest flex justify-center items-start h-full origin-center"
                          style={{ transform: `translate(-50%, -50%) rotate(${n * 6}deg)` }}>
                          <span className="mt-1.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" style={{ transform: `rotate(${-n*6}deg)` }}>{n}</span>
                      </div>
                    ))}
                    {/* Minute ticks 0-15 */}
                    {Array.from({length: 15}).map((_, i) => (
                      <div key={i} className="absolute top-1/2 left-1/2 w-[1px] h-full bg-transparent -translate-x-1/2 -translate-y-1/2" style={{ transform: `rotate(${i * 6}deg)` }}>
                          <div className="w-[1px] h-[4px] bg-gold-200 mt-1 shadow-[0_1px_1px_rgba(0,0,0,0.5)]"></div>
                      </div>
                    ))}
                    {/* 5 min ticks */}
                    {Array.from({length: 60}).map((_, i) => (
                      (i > 15 && i % 5 === 0) && (
                        <div key={i} className="absolute top-1/2 left-1/2 w-[1px] h-full bg-transparent -translate-x-1/2 -translate-y-1/2" style={{ transform: `rotate(${i * 6}deg)` }}>
                            <div className="w-[2px] h-[4px] bg-gold-200 mt-1 shadow-[0_1px_1px_rgba(0,0,0,0.5)]"></div>
                        </div>
                      )
                    ))}
                </div>
            </div>
          </div>
      </div>

      {/* DIAL (Static relative to case, not spinning with bezel) */}
      <div className="absolute w-[76%] h-[76%] rounded-full z-20 overflow-hidden shadow-[inset_0_0_20px_black] border border-gold-400/20">
          {/* Dial Background: Green Sunburst */}
          <div className="absolute inset-0 bg-[#004225]" 
             style={{
               background: `
                 radial-gradient(circle at center, #006039 0%, #002a1a 90%),
                 conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.05) 15deg, transparent 30deg, rgba(255,255,255,0.05) 45deg, transparent 60deg, rgba(255,255,255,0.05) 75deg, transparent 90deg, rgba(255,255,255,0.05) 105deg, transparent 120deg, rgba(255,255,255,0.05) 135deg, transparent 150deg, rgba(255,255,255,0.05) 165deg, transparent 180deg, rgba(255,255,255,0.05) 195deg, transparent 210deg, rgba(255,255,255,0.05) 225deg, transparent 240deg, rgba(255,255,255,0.05) 255deg, transparent 270deg, rgba(255,255,255,0.05) 285deg, transparent 300deg, rgba(255,255,255,0.05) 315deg, transparent 330deg, rgba(255,255,255,0.05) 345deg, transparent 360deg)
               `,
               backgroundBlendMode: 'overlay'
             }}>
          </div>

          {/* Minute Track */}
          {Array.from({length: 60}).map((_, i) => (
             <div key={i} className="absolute top-1/2 left-1/2 w-full h-[1px] -translate-y-1/2 pointer-events-none" style={{ transform: `translate(-50%, -50%) rotate(${i * 6}deg)` }}>
                 <div className="absolute right-[2px] w-[1.5px] h-[1px] bg-gold-200/60"></div>
             </div>
          ))}

          {/* Indices (Using SVG for precision drawing of shapes) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
             <defs>
               <filter id="lume-glow">
                 <feGaussianBlur stdDeviation="0.4" result="coloredBlur"/>
                 <feMerge>
                   <feMergeNode in="coloredBlur"/>
                   <feMergeNode in="SourceGraphic"/>
                 </feMerge>
               </filter>
               <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5ecbf" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#947219" />
               </linearGradient>
             </defs>
             
             {/* 12 o'clock Triangle */}
             <path d="M50 14 L55 23 L45 23 Z" fill="white" stroke="url(#goldGradient)" strokeWidth="0.8" filter="url(#lume-glow)" />
             
             {/* 6 and 9 Rectangles */}
             <rect x="47.5" y="76" width="5" height="9" rx="0.5" fill="white" stroke="url(#goldGradient)" strokeWidth="0.8" filter="url(#lume-glow)" />
             <rect x="15" y="47.5" width="9" height="5" rx="0.5" fill="white" stroke="url(#goldGradient)" strokeWidth="0.8" filter="url(#lume-glow)" />

             {/* Circles for others */}
             {[1,2,4,5,7,8,10,11].map(h => {
                const angle = (h * 30 - 90) * (Math.PI / 180);
                const r = 36; 
                const cx = 50 + r * Math.cos(angle);
                const cy = 50 + r * Math.sin(angle);
                return <circle key={h} cx={cx} cy={cy} r="3.2" fill="white" stroke="url(#goldGradient)" strokeWidth="0.8" filter="url(#lume-glow)" />
             })}
          </svg>

          {/* Branding */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-center">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="#d4af37" className="mx-auto mb-0.5 drop-shadow-sm">
               <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11h-5v1h5v2H5v-2h5v-1H5z"/>
             </svg>
             <div className="text-white text-[8px] font-serif font-bold tracking-widest leading-none drop-shadow-md">ROLEX</div>
             <div className="text-white text-[5px] font-sans tracking-wide mt-0.5 uppercase">Oyster Perpetual</div>
             <div className="text-white text-[5px] font-sans tracking-wide uppercase">Date</div>
          </div>
          <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-center">
             <div className="text-white text-[6px] font-sans tracking-wide uppercase font-bold">Submariner</div>
             <div className="text-gold-200 text-[5px] font-sans tracking-widest mt-0.5">1000ft = 300m</div>
             <div className="text-white text-[5px] font-sans tracking-widest mt-0.5 opacity-80 uppercase">Superlative Chronometer</div>
             <div className="text-white text-[5px] font-sans tracking-widest opacity-80 uppercase">Officially Certified</div>
          </div>

          {/* Date Window */}
          <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[16%] h-[12%] bg-white rounded-[1px] shadow-inner flex items-center justify-center z-10 border border-gold-300/30">
              <span className="text-black font-sans font-bold text-[9px]">{dateNum}</span>
          </div>
      </div>

      {/* Cyclops (Physical Layer above Dial, Fixed position relative to case) */}
      <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[20%] h-[15%] bg-white/5 rounded-[6px] backdrop-blur-[2px] shadow-lg border border-white/20 z-40 pointer-events-none" 
           style={{ transform: 'translateX(28%) scale(1.1)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-[6px]"></div>
      </div>

      {/* HANDS (SVG for Precise Geometry) */}
      <div className="absolute inset-[13%] rounded-full z-30 pointer-events-none">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
             <defs>
               <filter id="hand-shadow" x="-50%" y="-50%" width="200%" height="200%">
                 <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.6"/>
               </filter>
             </defs>

             {/* Hour Hand (Mercedes) - Refined Geometry */}
             <g transform={`rotate(${hourDeg}, 50, 50)`} filter="url(#hand-shadow)">
                {/* Stem: Stops at circle rim to prevent "broken" look */}
                <path d="M50 54 L50 32.5" stroke="#d4af37" strokeWidth="2.2" strokeLinecap="butt" />
                
                {/* Mercedes Circle Rim */}
                <circle cx="50" cy="28" r="4.5" stroke="#d4af37" strokeWidth="0.8" fill="none" />
                
                {/* Mercedes Star - Connected to Center */}
                <path d="M50 23.5 L50 28 L53.9 30.25 M50 28 L46.1 30.25" stroke="#d4af37" strokeWidth="0.6" strokeLinecap="round" />
                
                {/* Tip Spike */}
                <path d="M50 23.5 L50 18" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
                
                {/* Lume Fills (White Sections) */}
                <path d="M50.4 28.5 L53.2 30 A 3.8 3.8 0 0 0 50.4 24.2 Z" fill="white" />
                <path d="M49.6 28.5 L46.8 30 A 3.8 3.8 0 0 1 49.6 24.2 Z" fill="white" />
                <path d="M50 29 L53 30.6 A 3.8 3.8 0 0 1 47 30.6 Z" fill="white" />
             </g>

             {/* Minute Hand (Sword) - Sharp Taper */}
             <g transform={`rotate(${minDeg}, 50, 50)`} filter="url(#hand-shadow)">
                <path d="M49 54 L49 14 L50 8 L51 14 L51 54 Z" fill="#d4af37" />
                <path d="M49.5 45 L49.5 14 L50 10 L50.5 14 L50.5 45 Z" fill="white" />
             </g>

             {/* Second Hand (Lollipop) */}
             <g transform={`rotate(${secDeg}, 50, 50)`} filter="url(#hand-shadow)">
                <line x1="50" y1="65" x2="50" y2="10" stroke="#d4af37" strokeWidth="0.6" />
                {/* Lume Dot - Placed closer to tip for Submariner style */}
                <circle cx="50" cy="24" r="2.2" fill="#d4af37" />
                <circle cx="50" cy="24" r="1.4" fill="white" />
                {/* Counterweight */}
                <circle cx="50" cy="50" r="1.8" fill="#d4af37" />
             </g>
          </svg>
      </div>

      {/* Center Pin Cap */}
      <div className="absolute w-1.5 h-1.5 bg-silver-200 rounded-full z-50 shadow-sm border border-silver-400"></div>

    </div>
  )
}