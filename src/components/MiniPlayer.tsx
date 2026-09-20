import React from 'react';
import { Track } from '../types';

interface MiniPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenNowPlaying: () => void;
  onOpenStudio: () => void;
  progressPercent: number;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onOpenNowPlaying,
  onOpenStudio,
  progressPercent,
}) => {
  return (
    <aside className="fixed bottom-20 inset-x-0 z-40 px-3 sm:px-4 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto rounded-xl bg-[#292a2e]/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8),0_0_32px_-8px_rgba(121,40,202,0.35)] overflow-hidden transition-all hover:border-[#dbb8ff]/30">
        <div className="p-2.5 sm:p-3 flex items-center justify-between gap-3">
          {/* Track Info Click Target */}
          <div
            onClick={onOpenNowPlaying}
            className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-lg bg-[#343439]/80 flex items-center justify-center overflow-hidden flex-shrink-0 relative shadow-inner">
              {currentTrack.coverUrl ? (
                <img
                  src={currentTrack.coverUrl}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <span className="material-symbols-outlined text-[#dbb8ff] text-2xl animate-pulse">
                  graphic_eq
                </span>
              )}
              <div className="absolute inset-0 bg-[#dbb8ff]/10 mix-blend-overlay"></div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-[#e3e2e8] truncate group-hover:text-[#dbb8ff] transition-colors">
                  {currentTrack.title}
                </span>
                {isPlaying && (
                  <div className="flex items-end gap-[2px] h-3 flex-shrink-0">
                    <span className="w-[2.5px] bg-[#dbb8ff] rounded-full animate-eq-1"></span>
                    <span className="w-[2.5px] bg-[#aec6ff] rounded-full animate-eq-2"></span>
                    <span className="w-[2.5px] bg-[#ffb1c5] rounded-full animate-eq-3"></span>
                  </div>
                )}
              </div>
              <span className="text-xs text-[#cec2d6] truncate block">
                {currentTrack.artist}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenStudio}
              aria-label="Studio Assist"
              title="Studio Assist"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#aec6ff] hover:text-[#e3e2e8] hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">graphic_eq</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePlay();
              }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e3e2e8] text-[#121317] hover:scale-105 active:scale-95 transition-all shadow-[0_0_16px_rgba(219,184,255,0.3)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#343439]/40">
          <div
            className="h-full bg-gradient-to-r from-[#7928ca] via-[#508eff] to-[#ffb1c5] rounded-r-full shadow-[0_0_8px_rgba(219,184,255,0.8)] transition-all duration-300"
            style={{ width: `${Math.max(3, progressPercent)}%` }}
          ></div>
        </div>
      </div>
    </aside>
  );
};
