import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Flag, RotateCcw, Download } from 'lucide-react';
import { WatchProps } from '../../types';
import { formatDuration } from '../../utils/timeMath';

interface Lap {
  id: number;
  splitTime: number; // Duration of this specific lap
  totalTime: number; // Total elapsed time when lap was hit
}

export const Stopwatch: React.FC<WatchProps> = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [statusMessage, setStatusMessage] = useState(''); // For ARIA live region

  // Refs for high-precision timing drift avoidance
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);
  const requestRef = useRef<number>(0);
  
  // Refs for event handlers to avoid dependency cycle in useEffect
  const isRunningRef = useRef(isRunning);
  const elapsedTimeRef = useRef(elapsedTime);
  const lapsRef = useRef(laps);

  // Keep refs synced with state
  useEffect(() => { isRunningRef.current = isRunning; }, [isRunning]);
  useEffect(() => { elapsedTimeRef.current = elapsedTime; }, [elapsedTime]);
  useEffect(() => { lapsRef.current = laps; }, [laps]);

  const updateTime = useCallback(() => {
    const now = performance.now();
    setElapsedTime(accumulatedTimeRef.current + (now - startTimeRef.current));
    requestRef.current = requestAnimationFrame(updateTime);
  }, []);

  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50);
    }
  };

  const handleStart = () => {
    if (!isRunningRef.current) {
      triggerHaptic();
      startTimeRef.current = performance.now();
      setIsRunning(true);
      requestRef.current = requestAnimationFrame(updateTime);
      setStatusMessage('Stopwatch started');
    }
  };

  const handleStop = () => {
    if (isRunningRef.current) {
      triggerHaptic();
      cancelAnimationFrame(requestRef.current);
      const now = performance.now();
      accumulatedTimeRef.current += now - startTimeRef.current;
      setIsRunning(false);
      setStatusMessage(`Stopwatch paused at ${formatDuration(elapsedTimeRef.current)}`);
    }
  };

  const handleToggle = () => (isRunningRef.current ? handleStop() : handleStart());

  const handleReset = () => {
    triggerHaptic();
    handleStop();
    accumulatedTimeRef.current = 0;
    setElapsedTime(0);
    setLaps([]);
    setStatusMessage('Stopwatch reset');
  };

  const handleLap = () => {
    if (!isRunningRef.current && elapsedTimeRef.current === 0) return;
    triggerHaptic();
    
    // Calculate split
    const currentTotal = isRunningRef.current
        ? accumulatedTimeRef.current + (performance.now() - startTimeRef.current)
        : accumulatedTimeRef.current;

    const lastLapTotal = lapsRef.current.length > 0 ? lapsRef.current[0].totalTime : 0;
    const split = currentTotal - lastLapTotal;

    const newLap: Lap = {
        id: lapsRef.current.length + 1,
        splitTime: split,
        totalTime: currentTotal
    };

    setLaps(prev => [newLap, ...prev]);
    setStatusMessage(`Lap ${newLap.id} recorded: ${formatDuration(split)}`);
  };

  const handleExport = () => {
    if (laps.length === 0) return;
    
    const headers = "Lap,Split Time,Total Time\n";
    const rows = [...laps].reverse().map(l => 
        `${l.id},${formatDuration(l.splitTime)},${formatDuration(l.totalTime)}`
    ).join("\n");
    
    const csvContent = "data:text/csv;charset=utf-8," + encodeURI(headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `chronos_laps_${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setStatusMessage('Laps exported to CSV');
  };

  // Keyboard Shortcuts - Optimized to prevent re-binding on every render
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if no other inputs are focused
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleToggle();
      } else if (e.code === 'KeyL') {
        handleLap();
      } else if (e.code === 'KeyR') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // Empty dependency array ensures listeners are attached once

  return (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-900 rounded-[2rem] p-1 shadow-2xl ring-4 ring-slate-200 dark:ring-slate-800 relative group overflow-hidden" role="timer" aria-label="Stopwatch">
      
      {/* Screen Container */}
      <div className="w-full h-full bg-slate-900 rounded-[1.8rem] flex flex-col relative overflow-hidden border-2 border-slate-800">
        
        {/* Invisible Live Region for Accessibility */}
        <div className="sr-only" aria-live="polite" role="status">
            {statusMessage}
        </div>

        {/* Main Display Area */}
        <div className="h-1/2 flex flex-col items-center justify-center border-b border-slate-800 bg-black relative z-10 px-2">
            <div className="w-full text-center px-4 overflow-hidden">
                <div className="text-gold-400 font-mono text-xl md:text-2xl tracking-wider tabular-nums drop-shadow-[0_0_8px_rgba(212,175,55,0.3)] whitespace-nowrap">
                    {formatDuration(elapsedTime)}
                </div>
            </div>
            <div className="flex space-x-6 mt-4">
                <button 
                    onClick={handleToggle}
                    className={`p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400 ${isRunning ? 'bg-red-900/50 text-red-400 hover:bg-red-900' : 'bg-green-900/50 text-green-400 hover:bg-green-900'}`}
                    aria-label={isRunning ? "Pause Stopwatch (Space)" : "Start Stopwatch (Space)"}
                    title={isRunning ? "Stop (Space)" : "Start (Space)"}
                >
                    {isRunning ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                </button>
                <button 
                    onClick={handleLap}
                    className="p-3 rounded-full bg-slate-800 text-silver-300 hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:opacity-50"
                    disabled={!isRunning && elapsedTime === 0}
                    aria-label="Record Lap (L)"
                    title="Lap (L)"
                >
                    <Flag size={20} />
                </button>
                <button 
                    onClick={handleReset}
                    className="p-3 rounded-full bg-slate-800 text-silver-300 hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                    aria-label="Reset Stopwatch (R)"
                    title="Reset (R)"
                >
                    <RotateCcw size={20} />
                </button>
            </div>
        </div>

        {/* Laps List Area */}
        <div className="h-1/2 bg-slate-900 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent p-4 relative">
             <div className="flex justify-between items-center mb-2 px-2 sticky top-0 bg-slate-900/95 backdrop-blur z-10 py-1 border-b border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Laps</span>
                {laps.length > 0 && (
                    <button 
                        onClick={handleExport} 
                        className="text-gold-500 hover:text-gold-400 transition-colors"
                        title="Export CSV"
                        aria-label="Export laps as CSV"
                    >
                        <Download size={14} />
                    </button>
                )}
             </div>
             
             <ul className="space-y-1 font-mono text-sm">
                {laps.map((lap) => (
                    <li key={lap.id} className="flex justify-between items-center px-2 py-1.5 rounded hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 last:border-0">
                        <span className="text-slate-500 w-8">#{String(lap.id).padStart(2, '0')}</span>
                        <span className="text-silver-100">{formatDuration(lap.splitTime)}</span>
                        <span className="text-slate-500 text-xs">{formatDuration(lap.totalTime)}</span>
                    </li>
                ))}
                {laps.length === 0 && (
                    <li className="text-center text-slate-600 text-xs py-4 italic">
                        No laps recorded
                    </li>
                )}
             </ul>
        </div>

      </div>
    </div>
  );
};