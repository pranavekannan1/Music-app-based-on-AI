import React, { useState, useEffect } from 'react';
import { AppTheme } from '../types';
import { getAppTheme, setAppTheme } from '../services/musicService';

interface ThemeSelectorProps {
  onThemeChange?: (theme: AppTheme) => void;
  className?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange, className = '' }) => {
  const [currentTheme, setCurrentThemeState] = useState<AppTheme>(getAppTheme());

  useEffect(() => {
    const handleThemeEvent = (e: CustomEvent<AppTheme>) => {
      setCurrentThemeState(e.detail);
    };
    window.addEventListener('rezbeatsai_theme_change', handleThemeEvent as EventListener);
    return () => {
      window.removeEventListener('rezbeatsai_theme_change', handleThemeEvent as EventListener);
    };
  }, []);

  const themes: {
    id: AppTheme;
    name: string;
    desc: string;
    bgHex: string;
    textHex: string;
    accentHex: string;
    glowHex: string;
    icon: string;
  }[] = [
    {
      id: 'dark',
      name: 'Dark Mode',
      desc: 'Midnight Obsidian & Purple Neon',
      bgHex: '#0c0d12',
      textHex: '#f1f0f7',
      accentHex: '#dbb8ff',
      glowHex: '#7928ca',
      icon: 'dark_mode',
    },
    {
      id: 'light',
      name: 'Light Mode',
      desc: 'Clean High-Contrast Studio Ivory',
      bgHex: '#f4f6f9',
      textHex: '#0f172a',
      accentHex: '#7928ca',
      glowHex: '#9333ea',
      icon: 'light_mode',
    },
    {
      id: 'sunset',
      name: 'Sunset Amber',
      desc: 'Warm Saffron, Terracotta & Gold',
      bgHex: '#17100b',
      textHex: '#fff7ed',
      accentHex: '#f59e0b',
      glowHex: '#ea580c',
      icon: 'wb_sunny',
    },
  ];

  const handleSelect = (t: AppTheme) => {
    setCurrentThemeState(t);
    setAppTheme(t);
    if (onThemeChange) onThemeChange(t);
  };

  return (
    <div className={`flex flex-col space-y-2.5 ${className}`}>
      <div className="grid grid-cols-3 gap-2.5">
        {themes.map((t) => {
          const isSelected = currentTheme === t.id;
          return (
            <div
              key={t.id}
              onClick={() => handleSelect(t.id)}
              className={`p-3 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all active:scale-95 relative overflow-hidden shadow-sm ${
                isSelected
                  ? 'border-[#7928ca] shadow-[0_0_16px_rgba(121,40,202,0.3)] ring-2 ring-[#dbb8ff]'
                  : 'border-white/[0.1] hover:border-white/30'
              }`}
              style={{ backgroundColor: t.bgHex }}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#1db954] shadow-[0_0_8px_#1db954]"></div>
              )}

              <div className="flex items-center gap-1.5 mb-2">
                <span className="material-symbols-outlined text-base" style={{ color: t.accentHex }}>
                  {t.icon}
                </span>
                <span className="text-xs font-bold truncate" style={{ color: t.textHex }}>
                  {t.name}
                </span>
              </div>

              {/* Color dots preview */}
              <div className="flex items-center gap-1.5 mt-auto">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20"
                  style={{ backgroundColor: t.glowHex }}
                ></span>
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20"
                  style={{ backgroundColor: t.accentHex }}
                ></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
