import React, { useState, useEffect } from 'react';
import { TabType, AppTheme, AudioQuality } from '../types';
import { SONIC_LOGO_URL } from '../data/musicData';
import { getAuthUser, getAppTheme, setAppTheme, getAudioQuality } from '../services/musicService';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenAuth?: () => void;
  onOpenQuality?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate, onOpenAuth, onOpenQuality }) => {
  const [user, setUser] = useState(getAuthUser());
  const [theme, setTheme] = useState<AppTheme>(getAppTheme());
  const [quality, setQuality] = useState<AudioQuality>(getAudioQuality());

  useEffect(() => {
    const handleAuthChange = (e: any) => {
      if (e.detail) setUser(e.detail);
    };
    const handleThemeChange = (e: any) => {
      if (e.detail) setTheme(e.detail);
    };
    const handleQualityChange = (e: any) => {
      if (e.detail) setQuality(e.detail);
    };

    window.addEventListener('sonic_auth_change', handleAuthChange);
    window.addEventListener('sonic_theme_change', handleThemeChange);
    window.addEventListener('sonic_quality_change', handleQualityChange);

    return () => {
      window.removeEventListener('sonic_auth_change', handleAuthChange);
      window.removeEventListener('sonic_theme_change', handleThemeChange);
      window.removeEventListener('sonic_quality_change', handleQualityChange);
    };
  }, []);

  const cycleTheme = () => {
    const nextTheme: AppTheme =
      theme === 'dark' ? 'light' : theme === 'light' ? 'sunset' : 'dark';
    setTheme(nextTheme);
    setAppTheme(nextTheme);
  };

  const getThemeLabel = (t: AppTheme) => {
    if (t === 'light') return 'Light';
    if (t === 'sunset') return 'Sunset';
    return 'Dark';
  };

  const getTabLabel = (tab: TabType) => {
    switch (tab) {
      case 'home':
        return 'Home Feed';
      case 'discover':
        return 'Search Worldwide';
      case 'radio':
        return 'Live World Radio';
      case 'studio':
        return 'Soundscape Studio';
      case 'library':
        return 'Your Library';
      case 'profile':
        return 'Profile';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#0d0e12]/90 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all">
      {/* Phone Status Bar */}
      <div className="max-w-md mx-auto px-4 pt-2 pb-1 flex items-center justify-between text-[#cec2d6] text-xs font-medium select-none">
        <span className="font-semibold text-[#e3e2e8] tracking-tight">9:41</span>
        <div className="flex items-center gap-2 text-[#cec2d6]">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-[#dbb8ff] font-mono border border-white/[0.06]">
            Sonic Hi-Fi
          </span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">signal_cellular_4_bar</span>
            <span className="material-symbols-outlined text-[15px]">wifi</span>
            <span className="material-symbols-outlined text-[17px] rotate-90">battery_full</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-md mx-auto h-14 px-4 flex items-center justify-between gap-2">
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="relative">
            <img
              src={SONIC_LOGO_URL}
              alt="Sonic Logo"
              className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl tracking-tight text-[#e3e2e8] font-bold font-display">Sonic</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7928ca]/25 text-[#dbb8ff] text-[10px] font-medium border border-[#dbb8ff]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dbb8ff] animate-pulse"></span>
              {getThemeLabel(theme)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* Theme Quick Switcher button */}
          <button
            onClick={cycleTheme}
            title={`Switch Theme (Current: ${getThemeLabel(theme)})`}
            className="w-8 h-8 rounded-full bg-[#1e1f26] border border-white/10 text-[#dbb8ff] flex items-center justify-center hover:bg-[#2a2b34] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">
              {theme === 'light' ? 'light_mode' : theme === 'sunset' ? 'wb_sunny' : 'dark_mode'}
            </span>
          </button>

          {/* Audio Quality Badge */}
          <button
            onClick={onOpenQuality}
            title="Streaming Quality"
            className="px-2 py-1 rounded-full bg-[#1e1f26] border border-white/10 text-[10px] font-mono font-bold text-[#1db954] hover:bg-[#2a2b34] transition-all cursor-pointer hidden sm:flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1db954]"></span>
            <span>{quality === '320k' ? '320k HD' : quality}</span>
          </button>

          {/* User Profile Avatar / Sign In */}
          {user.isLoggedIn ? (
            <button
              aria-label={`Profile - ${user.name}`}
              onClick={() => onNavigate('profile')}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all cursor-pointer relative ${
                currentTab === 'profile'
                  ? 'ring-2 ring-[#dbb8ff] ring-offset-2 ring-offset-[#121317]'
                  : 'hover:ring-1 hover:ring-[#dbb8ff]/50'
              }`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-white/10"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#1db954] border-2 border-[#121317]"></span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7928ca] to-[#dbb8ff] text-white text-xs font-bold shadow-md cursor-pointer hover:opacity-90 active:scale-95"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

