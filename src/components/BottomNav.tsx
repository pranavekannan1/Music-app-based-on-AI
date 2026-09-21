import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#0d0e12]/95 backdrop-blur-2xl border-t border-white/[0.06] shadow-[0_-4px_24px_rgba(0,0,0,0.7)]">
      <div className="flex justify-around items-center h-20 px-4 pb-[env(safe-area-inset-bottom)] relative max-w-[1720px] mx-auto">
        {/* 1. Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-16 transition-all cursor-pointer ${
            currentTab === 'home'
              ? 'text-[#dbb8ff] font-bold scale-105'
              : 'text-[#cec2d6]/70 hover:text-[#e3e2e8]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">home</span>
          <span className="text-[11px] tracking-wide">Home</span>
        </button>

        {/* 2. Explore / Search */}
        <button
          onClick={() => onTabChange('discover')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-16 transition-all cursor-pointer ${
            currentTab === 'discover'
              ? 'text-[#dbb8ff] font-bold scale-105'
              : 'text-[#cec2d6]/70 hover:text-[#e3e2e8]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">search</span>
          <span className="text-[11px] tracking-wide">Search</span>
        </button>

        {/* 3. Live World Radio (24/7 free streams) */}
        <button
          onClick={() => onTabChange('radio')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-16 transition-all cursor-pointer ${
            currentTab === 'radio'
              ? 'text-[#dbb8ff] font-bold scale-105'
              : 'text-[#cec2d6]/70 hover:text-[#e3e2e8]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">podcasts</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          </div>
          <span className="text-[11px] tracking-wide">Radio</span>
        </button>

        {/* 4. Library */}
        <button
          onClick={() => onTabChange('library')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-16 transition-all cursor-pointer ${
            currentTab === 'library'
              ? 'text-[#dbb8ff] font-bold scale-105'
              : 'text-[#cec2d6]/70 hover:text-[#e3e2e8]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">library_music</span>
          <span className="text-[11px] tracking-wide">Library</span>
        </button>

        {/* 5. Soundscape Studio */}
        <button
          onClick={() => onTabChange('studio')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-16 transition-all cursor-pointer ${
            currentTab === 'studio'
              ? 'text-[#dbb8ff] font-bold scale-105'
              : 'text-[#cec2d6]/70 hover:text-[#e3e2e8]'
          }`}
        >
          <span className="material-symbols-outlined text-[23px] text-[#dbb8ff]/80">
            graphic_eq
          </span>
          <span className="text-[10px] tracking-wide text-[#dbb8ff]/80">Studio</span>
        </button>
      </div>
    </nav>
  );
};
