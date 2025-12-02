import React from 'react';
import { Moon, Sun, Globe, MapPin, Eye } from 'lucide-react';
import { AppSettings, AVAILABLE_TIMEZONES } from '../../types';

interface Props {
  settings: AppSettings;
  updateSetting: (key: keyof AppSettings, value: any) => void;
  isDark: boolean;
  toggleTheme: () => void;
  onLocationRequest: () => void;
}

export const ControlBar: React.FC<Props> = ({ settings, updateSetting, isDark, toggleTheme, onLocationRequest }) => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-[#050505]/95 border-b border-slate-200 dark:border-white/10 transition-colors duration-500" aria-label="Global Settings">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Brand */}
          <div className="flex items-center space-x-3 select-none">
            <div className="p-2 bg-gradient-to-br from-rolex-dim to-rolex rounded-sm shadow-lg border border-gold-600/30">
               {/* Simple SVG Logo - Crown Mockup */}
               <svg className="w-6 h-6 text-gold-400" fill="currentColor" viewBox="0 0 24 24" stroke="none" aria-hidden="true">
                 <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11h-5v1h5v2H5v-2h5v-1H5z"/>
               </svg>
            </div>
            <div>
                <h1 className="text-xl md:text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-silver-100">
                    CHRONOS
                </h1>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            
            {/* Timezone Selector */}
            <div className="relative group">
                <label htmlFor="timezone-select" className="sr-only">Select Timezone</label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-600 dark:text-slate-400">
                    <Globe className="w-4 h-4" />
                </div>
                <select 
                    id="timezone-select"
                    value={settings.timezone}
                    onChange={(e) => updateSetting('timezone', e.target.value)}
                    className="pl-9 pr-8 py-2 bg-slate-100 dark:bg-surface border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-silver-200 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 focus:outline-none appearance-none cursor-pointer transition-colors shadow-sm min-w-[160px]"
                >
                    {AVAILABLE_TIMEZONES.map(tz => (
                        <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>
                    ))}
                </select>
            </div>

            {/* Location Button */}
            <button
                onClick={onLocationRequest}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-bold transition-all border shadow-sm ${
                    settings.userLocation 
                    ? 'bg-rolex-light/10 text-rolex dark:text-rolex-light border-rolex/50' 
                    : 'bg-white dark:bg-surface text-slate-700 dark:text-silver-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                title={settings.userLocation ? `Lat: ${settings.userLocation.latitude.toFixed(2)}` : "Set Location for Sundial"}
                aria-label="Set Location"
            >
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">{settings.userLocation ? 'Local' : 'Set Loc'}</span>
            </button>

            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-1 hidden md:block" role="separator" />

            {/* Accessibility / Theme Toggles */}
            <div className="flex items-center space-x-2 p-1 bg-slate-100 dark:bg-surface rounded-xl border border-slate-200 dark:border-slate-700">
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-gold-400 text-slate-700 dark:text-silver-300"
                    aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                
                <button
                    onClick={() => updateSetting('isHighContrast', !settings.isHighContrast)}
                    className={`p-2 rounded-lg transition-colors focus:ring-2 focus:ring-gold-400 ${
                        settings.isHighContrast 
                        ? 'bg-black text-yellow-400 ring-2 ring-yellow-400' 
                        : 'hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-silver-300'
                    }`}
                    aria-label="Toggle High Contrast Mode"
                    title="High Contrast Mode"
                    aria-pressed={settings.isHighContrast}
                >
                    <Eye className="w-4 h-4" />
                </button>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};