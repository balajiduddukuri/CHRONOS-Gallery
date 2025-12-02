import React, { useState, useEffect } from 'react';
import { useTime } from './hooks/useTime';
import { AppSettings } from './types';
import { ControlBar } from './components/ui/ControlBar';
import { WatchContainer } from './components/ui/WatchContainer';

// Faces - Ensure all imports are relative paths
import { LuxuryAnalog } from './components/faces/LuxuryAnalog';
import { ModernDigital } from './components/faces/ModernDigital';
import { Sundial } from './components/faces/Sundial';
import { Minimalist } from './components/faces/Minimalist';
import { Chronograph } from './components/faces/Chronograph';
import { Stopwatch } from './components/faces/Stopwatch';
import { RolexStyle } from './components/faces/RolexStyle';
import { AppleStyle } from './components/faces/AppleStyle';

const App = () => {
  // Global Time Source
  const time = useTime();
  
  // App State
  const [isDark, setIsDark] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Items');
  const [settings, setSettings] = useState<AppSettings>(() => {
    // Load from local storage or default
    const saved = localStorage.getItem('chronos_settings');
    return saved ? JSON.parse(saved) : {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      isHighContrast: false,
      useDemoLocation: false,
      userLocation: null
    };
  });

  // Effects
  useEffect(() => {
    // Persist settings
    localStorage.setItem('chronos_settings', JSON.stringify(settings));

    // Handle Theme Class
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
    
    // Handle High Contrast
    if (settings.isHighContrast) document.body.classList.add('high-contrast');
    else document.body.classList.remove('high-contrast');

  }, [isDark, settings]);

  const updateSetting = (key: keyof AppSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLocationRequest = () => {
    if (settings.userLocation) {
        if (confirm("Reset location data?")) {
            updateSetting('userLocation', null);
        }
        return;
    }

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }
    
    if (confirm("Allow Chronos to access your location for the Sundial simulation? Data is stored locally.")) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                updateSetting('userLocation', {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                });
            },
            (err) => {
                console.error(err);
                alert("Could not retrieve location. Enabling demo mode.");
                updateSetting('useDemoLocation', true);
            }
        );
    }
  };

  // Watch Definitions
  // We define them here to render dynamically. 
  // Note: Using CSS hidden for filtering ensures the Stopwatch state (running time/laps) isn't lost when switching tabs.
  const watchItems = [
    {
        id: 'royal',
        title: "Royal Perpetual",
        description: "Luxury Analog Standard",
        category: "Mechanical",
        rarity: "Legendary",
        edition: "#001/500",
        ariaLabel: "Luxury analog watch face with gold accents",
        component: <LuxuryAnalog time={time} timezone={settings.timezone} />
    },
    {
        id: 'diver',
        title: "Submarine Diver",
        description: "Professional Automatic",
        category: "Mechanical",
        rarity: "Epic",
        edition: "Ref. 16610",
        ariaLabel: "Diver watch with rotating bezel and cyclops date window",
        component: <RolexStyle time={time} timezone={settings.timezone} />
    },
    {
        id: 'smart',
        title: "Series X Smart",
        description: "Connected Interface",
        category: "Digital",
        rarity: "Rare",
        edition: "S/N: 8872",
        ariaLabel: "Modern smartwatch interface with activity rings",
        component: <AppleStyle time={time} timezone={settings.timezone} />
    },
    {
        id: 'cyber',
        title: "Cyber Deck IV",
        description: "High-Visibility Digital",
        category: "Digital",
        rarity: "Rare",
        edition: "#892/1000",
        ariaLabel: "High contrast digital display",
        component: <ModernDigital time={time} timezone={settings.timezone} />
    },
    {
        id: 'trackmaster',
        title: "Trackmaster Pro",
        description: "High-Precision Stopwatch",
        category: "Experimental", 
        rarity: "Epic",
        edition: "#PRO-24",
        ariaLabel: "Digital stopwatch with lap functionality",
        component: <Stopwatch time={time} timezone={settings.timezone} />
    },
    {
        id: 'solaris',
        title: "Solaris Antiquity",
        description: "Physics-based Sundial",
        category: "Celestial",
        rarity: "Artifact",
        edition: "Unique",
        ariaLabel: "Sundial simulation showing shadow based on sun position",
        component: <Sundial time={time} timezone={settings.timezone} settings={settings} />
    },
    {
        id: 'grandprix',
        title: "Grand Prix 1969",
        description: "Automatic Chronograph",
        category: "Mechanical",
        rarity: "Vintage",
        edition: "Restored",
        ariaLabel: "Racing chronograph with tachymeter",
        component: <Chronograph time={time} timezone={settings.timezone} />
    },
    {
        id: 'bauhaus',
        title: "Bauhaus Minimal",
        description: "Modernist Design",
        category: "Mechanical",
        rarity: "Common",
        edition: "Unlimited",
        ariaLabel: "Minimalist watch face",
        component: <Minimalist time={time} timezone={settings.timezone} />
    }
  ];

  const filters = ['All Items', 'Mechanical', 'Digital', 'Celestial', 'Experimental'];

  return (
    <div className="min-h-screen transition-colors duration-500 overflow-x-hidden flex flex-col bg-slate-50 dark:bg-[#050505]">
      
      {/* Settings & Navigation */}
      <ControlBar 
        settings={settings}
        updateSetting={updateSetting}
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
        onLocationRequest={handleLocationRequest}
      />

      {/* Hero: "Rolex Inspired" Green/Gold Theme */}
      <header className="relative pt-24 pb-24 px-6 text-center overflow-hidden bg-slate-50 dark:bg-background transition-colors duration-500">
        {/* Artistic Background Layers */}
        <div className="absolute inset-0 opacity-15 dark:opacity-30 pointer-events-none mix-blend-multiply dark:mix-blend-screen"
             style={{
               backgroundImage: `
                 radial-gradient(circle at 20% 30%, #d4af37 0%, transparent 20%),
                 radial-gradient(circle at 80% 70%, #006039 0%, transparent 50%),
                 linear-gradient(to bottom, transparent, #004225 100%),
                 url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23006039' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
               `
             }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-block mb-4 animate-fade-in">
                 <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-bold border-b border-gold-500 pb-1">Perpetual Planet</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-serif font-bold mb-6 text-slate-900 dark:text-white tracking-tighter drop-shadow-2xl">
              CHRONOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-200 to-gold-400 italic">Gallery</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-700 dark:text-silver-300 leading-relaxed font-sans font-medium">
              A curated collection of digital and mechanical timekeeping artifacts. 
              <br className="hidden md:block"/>
              Explore precision, history, and celestial mechanics in a unified interface.
            </p>
        </div>
      </header>

      {/* Watch Grid */}
      <main id="main-content" className="flex-grow max-w-7xl mx-auto px-6 pb-24 w-full" role="main">
        
        {/* Filter / Category Header */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center" role="tablist" aria-label="Watch Categories">
            {filters.map((filter) => (
                <button 
                    key={filter} 
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-400 dark:focus:ring-offset-black ${
                        activeFilter === filter 
                        ? 'bg-rolex text-gold-50 border-gold-400 shadow-xl scale-105 ring-1 ring-gold-400' 
                        : 'bg-white/5 dark:bg-surface/50 text-slate-500 border-slate-300 dark:border-slate-800 dark:text-silver-500 hover:border-rolex hover:text-rolex dark:hover:text-rolex-light transition-colors'
                    }`}
                    aria-selected={activeFilter === filter}
                    role="tab"
                    tabIndex={activeFilter === filter ? 0 : -1}
                >
                    {filter}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {watchItems.map((watch) => {
                const isVisible = activeFilter === 'All Items' || watch.category === activeFilter;
                
                return (
                    <div 
                        key={watch.id} 
                        className={isVisible ? 'block h-full' : 'hidden'}
                        role="tabpanel"
                    >
                        <WatchContainer 
                            title={watch.title} 
                            description={watch.description}
                            labels={{ ariaLabel: watch.ariaLabel }}
                            rarity={watch.rarity}
                            edition={watch.edition}
                        >
                            {watch.component}
                        </WatchContainer>
                    </div>
                );
            })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-rolex-dim/30 bg-white dark:bg-[#080808] py-12 text-center text-slate-500 dark:text-silver-600 text-sm" role="contentinfo">
        <div className="text-rolex dark:text-rolex-light mb-4">
             <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3 5h6l-3 5 2 7-8-4-8 4 2-7-3-5h6z"/></svg>
        </div>
        <p className="font-serif tracking-widest mb-2 text-rolex-dim dark:text-silver-400">CHRONOS HOROLOGY</p>
        <p>© {new Date().getFullYear()} All Rights Reserved. Demo Application.</p>
      </footer>

    </div>
  );
};

export default App;