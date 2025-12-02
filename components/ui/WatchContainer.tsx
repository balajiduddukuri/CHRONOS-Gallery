import React from 'react';

interface WatchContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  labels?: {
    ariaLabel: string;
  };
  rarity?: string;
  edition?: string;
}

export const WatchContainer: React.FC<WatchContainerProps> = ({ title, description, children, labels, rarity = "Common", edition = "Unlimited" }) => {
  // Determine color based on rarity for the badge, tweaked for the new palette
  const rarityColors: Record<string, string> = {
    'Common': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    'Rare': 'bg-rolex-light/10 text-rolex dark:text-rolex-light border border-rolex-light/20',
    'Epic': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-500/20',
    'Legendary': 'bg-gold-100 text-gold-800 dark:bg-gold-900/20 dark:text-gold-300 border border-gold-500/30',
    'Artifact': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    'Vintage': 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300',
  };

  const badgeClass = rarityColors[rarity] || rarityColors['Common'];

  return (
    <article 
      className="group relative flex flex-col items-center p-8 bg-white dark:bg-[#111] rounded-3xl shadow-lg border border-slate-200 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:border-rolex/40 hover:shadow-rolex/10"
      aria-label={`${title} (${rarity} Item): ${description}`}
    >
      {/* NFT-style Metadata Header */}
      <div className="w-full flex justify-between items-center mb-6 px-2">
        <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm font-bold ${badgeClass}`}>
            {rarity}
        </span>
        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 tracking-wider">
            {edition}
        </span>
      </div>

      <div 
        className="relative mb-8 w-64 h-64 md:w-72 md:h-72 transition-transform duration-500 ease-out group-hover:scale-105"
        role="img" 
        aria-label={labels?.ariaLabel || `Interactive display of ${title}`}
      >
        {children}
      </div>
      
      <div className="text-center z-10 w-full border-t border-slate-100 dark:border-white/5 pt-6 mt-2">
        <h3 className="font-serif text-2xl font-bold tracking-wide text-slate-900 dark:text-silver-200 mb-2 group-hover:text-rolex dark:group-hover:text-rolex-light transition-colors">
          {title}
        </h3>
        <p className="text-sm font-medium text-slate-600 dark:text-silver-500 uppercase tracking-widest font-sans flex items-center justify-center gap-2">
           <span className="w-1 h-1 rounded-full bg-gold-400 inline-block"></span>
           {description}
           <span className="w-1 h-1 rounded-full bg-gold-400 inline-block"></span>
        </p>
      </div>
      
      {/* Interactive Shine Effect */}
      <div 
        className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/0 via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700" 
        aria-hidden="true"
      />
    </article>
  );
};