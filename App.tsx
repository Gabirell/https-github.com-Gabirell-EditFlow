import React, { useState, useCallback } from 'react';
import { Software, OS, Language, SearchState, AppConfig } from './types';
import { TRANSLATIONS, SOFTWARE_ICONS, SOFTWARE_COLORS, SOFTWARE_THEMES } from './constants';
import { searchShortcuts } from './services/geminiService';
import ShortcutCard from './components/ShortcutCard';
import Logo from './components/Logo';

const getSoftwareLabel = (sw: Software): string => {
  switch (sw) {
    case Software.PREMIERE: return 'Premiere';
    case Software.AFTER_EFFECTS: return 'After Effects';
    case Software.FINAL_CUT: return 'Final Cut';
    case Software.DAVINCI: return 'DaVinci';
    case Software.BLENDER: return 'Blender';
    case Software.CAPCUT: return 'CapCut';
    case Software.NUKE: return 'Nuke';
    default: return sw;
  }
};

const SoftwareIcon: React.FC<{ sw: Software, className?: string }> = ({ sw, className = "w-10 h-10" }) => {
  const [imgError, setImgError] = useState(false);
  const theme = SOFTWARE_THEMES[sw];

  if (imgError) {
    return (
      <div className={`${className} ${theme.bg} rounded-xl border border-white/10 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105`}>
        <span className={`${theme.text} text-lg font-black italic tracking-tighter`}>
          {theme.initials}
        </span>
      </div>
    );
  }

  return (
    <img 
      src={SOFTWARE_ICONS[sw]} 
      alt={sw} 
      onError={() => setImgError(true)}
      className={`${className} object-contain transition-all duration-300 drop-shadow-xl group-hover:scale-110`}
      loading="eager"
    />
  );
};

const SoftwareButton: React.FC<{
  sw: Software;
  isSelected: boolean;
  onClick: () => void;
}> = ({ sw, isSelected, onClick }) => {
  const themeClasses = (SOFTWARE_COLORS[sw] || "border-slate-800 bg-slate-900").split(' ');
  const borderColor = themeClasses[0];
  const bgColor = themeClasses[1];

  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl transition-all duration-300
        border-2 group overflow-hidden
        ${isSelected 
          ? `${borderColor} ${bgColor} shadow-lg scale-105 z-10` 
          : 'border-slate-800 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-800'}
      `}
    >
      <div className="mb-2 relative">
        <SoftwareIcon sw={sw} className="w-8 h-8 sm:w-10 sm:h-10" />
        {isSelected && (
           <div className="absolute -inset-2 bg-white/5 rounded-full blur-xl animate-pulse-slow"></div>
        )}
      </div>
      
      <span className={`text-[9px] sm:text-[10px] md:text-xs font-black tracking-[0.05em] text-center uppercase leading-tight ${isSelected ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
        {getSoftwareLabel(sw)}
      </span>
      
      {isSelected && (
        <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full ${borderColor.replace('border-', 'bg-')} blur-[2px]`}></div>
      )}
    </button>
  );
};

const App: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>({
    software: Software.PREMIERE,
    os: OS.MAC,
    softwareLanguage: Language.ENGLISH,
    uiLanguage: Language.ENGLISH
  });

  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    results: [],
    isLoading: false,
    error: null
  });

  const t = TRANSLATIONS[config.uiLanguage];

  const handleSearch = useCallback(async () => {
    if (!searchState.query.trim()) return;
    setSearchState(prev => ({ ...prev, isLoading: true, error: null, results: [] }));
    try {
      const results = await searchShortcuts(
        searchState.query,
        config.software,
        config.os,
        config.softwareLanguage,
        config.uiLanguage
      );
      setSearchState(prev => ({ ...prev, isLoading: false, results }));
    } catch (error) {
      setSearchState(prev => ({ ...prev, isLoading: false, error: (error as Error).message }));
    }
  }, [searchState.query, config]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/40">
      <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-9 h-9" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">
                {t.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <select 
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all cursor-pointer"
              value={config.uiLanguage}
              onChange={(e) => setConfig(prev => ({ ...prev, uiLanguage: e.target.value as Language }))}
            >
              {Object.values(Language).map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="mb-12">
            <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black mb-6">{t.settings}</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-8">
                {Object.values(Software).map(sw => (
                  <SoftwareButton 
                    key={sw}
                    sw={sw}
                    isSelected={config.software === sw}
                    onClick={() => setConfig(prev => ({ ...prev, software: sw }))}
                  />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 bg-slate-900/40 p-5 rounded-2xl border border-slate-800/60 shadow-sm">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{t.selectOS}</span>
                <div className="flex bg-slate-950/50 rounded-xl p-1 gap-1 border border-slate-800/30">
                  {Object.values(OS).map(os => (
                    <button
                      key={os}
                      onClick={() => setConfig(prev => ({ ...prev, os: os }))}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        config.os === os 
                        ? 'bg-slate-800 text-white shadow-lg' 
                        : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {os}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 bg-slate-900/40 p-5 rounded-2xl border border-slate-800/60 shadow-sm">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{t.softwareLang}</span>
                <select 
                  className="w-full bg-slate-950/50 border border-slate-800/30 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none cursor-pointer hover:border-slate-700 transition-all"
                  value={config.softwareLanguage}
                  onChange={(e) => setConfig(prev => ({ ...prev, softwareLanguage: e.target.value as Language }))}
                >
                  {Object.values(Language).map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
        </section>

        <section className="mb-16">
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-2xl shadow-2xl flex items-center p-2.5">
              <input 
                type="text"
                value={searchState.query}
                onChange={(e) => setSearchState(prev => ({ ...prev, query: e.target.value }))}
                onKeyDown={handleKeyPress}
                placeholder={t.searchPlaceholder}
                className="flex-1 bg-transparent border-none text-base md:text-lg text-white placeholder-slate-600 px-5 py-4 focus:ring-0 focus:outline-none"
              />
              <button 
                onClick={handleSearch}
                disabled={searchState.isLoading || !searchState.query.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white px-8 py-4 rounded-xl font-bold tracking-tight shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {searchState.isLoading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <span>{t.searchButton}</span>
                )}
              </button>
            </div>
          </div>
          <p className="mt-5 text-slate-500 text-xs text-center font-medium italic opacity-60">{t.tip}</p>
        </section>

        <section className="min-h-[300px]">
          {searchState.error && (
             <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-5 rounded-2xl text-center font-bold text-sm mb-8">
                {searchState.error}
             </div>
          )}

          {searchState.isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-40 bg-slate-900/50 rounded-2xl border border-slate-800"></div>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchState.results.map((result, idx) => (
                <ShortcutCard 
                  key={idx} 
                  shortcut={result} 
                  software={config.software} 
                  translations={t}
                />
              ))}
            </div>
          )}

          {!searchState.isLoading && searchState.results.length === 0 && searchState.query && !searchState.error && (
            <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
              <p className="text-slate-500 font-medium">{t.noResults}</p>
            </div>
          )}

           {!searchState.isLoading && !searchState.query && searchState.results.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 rounded-3xl border border-dashed border-slate-800/50 bg-slate-900/10">
                  <div className="relative mb-6">
                    <SoftwareIcon sw={config.software} className="w-20 h-20 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                  </div>
                  <p className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">
                    Ready to search for {getSoftwareLabel(config.software)}
                  </p>
              </div>
           )}
        </section>
      </main>

      <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-slate-800/50 text-center">
        <div className="flex flex-col items-center gap-4">
          <a 
            href="https://gabrielnetto.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-indigo-400 text-sm font-semibold tracking-wider transition-colors duration-200 underline-offset-4 hover:underline"
          >
            gabrielnetto.com
          </a>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
            Powered by Gemini 3 Flash • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;