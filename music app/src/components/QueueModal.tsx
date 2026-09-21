import React from 'react';
import { Track } from '../types';

interface QueueModalProps {
  currentTrack: Track;
  queue: Track[];
  queueIndex: number;
  isPlaying: boolean;
  onClose: () => void;
  onSelectTrack: (track: Track, index: number) => void;
  onRemoveFromQueue: (index: number) => void;
  onMoveQueueItem: (fromIndex: number, toIndex: number) => void;
  onClearUpcoming: () => void;
}

export const QueueModal: React.FC<QueueModalProps> = ({
  currentTrack,
  queue,
  queueIndex,
  isPlaying,
  onClose,
  onSelectTrack,
  onRemoveFromQueue,
  onMoveQueueItem,
  onClearUpcoming,
}) => {
  const previousTracks = queue.slice(0, queueIndex);
  const upcomingTracks = queue.slice(queueIndex + 1);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end animate-fade-in">
      <div 
        onClick={onClose} 
        className="flex-1 w-full"
        aria-label="Close backdrop"
      />
      
      <div className="bg-[#14151c] text-[#f1f0f7] border-t border-white/[0.1] rounded-t-3xl max-h-[85vh] flex flex-col w-full max-w-md mx-auto shadow-2xl overflow-hidden animate-slide-up">
        {/* Modal Handle & Header */}
        <div className="px-5 pt-3 pb-2 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#dbb8ff] text-xl">queue_music</span>
            <h3 className="text-base font-bold text-white">Play Queue</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#7928ca]/30 text-[#dbb8ff] font-mono font-bold">
              {queue.length} {queue.length === 1 ? 'song' : 'songs'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] text-[#cec2d6] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 no-scrollbar">
          {/* 1. NOW PLAYING */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#dbb8ff]">
                Now Playing
              </span>
              <span className="text-[10px] text-[#1db954] flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1db954] animate-pulse"></span>
                Non-stop Playback Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#7928ca]/20 border border-[#dbb8ff]/30 shadow-md">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={currentTrack.coverUrl}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                      <span className="w-1 bg-[#1db954] animate-eq-1"></span>
                      <span className="w-1 bg-[#1db954] animate-eq-2"></span>
                      <span className="w-1 bg-[#1db954] animate-eq-3"></span>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-white truncate">
                    {currentTrack.title}
                  </h4>
                  <p className="text-xs text-[#cec2d6] truncate">
                    {currentTrack.artist}
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono text-[#cec2d6] ml-2">
                {currentTrack.duration}
              </span>
            </div>
          </section>

          {/* 2. UP NEXT */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#cec2d6]">
                Up Next ({upcomingTracks.length})
              </span>
              {upcomingTracks.length > 0 && (
                <button
                  onClick={onClearUpcoming}
                  className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
                >
                  Clear Upcoming
                </button>
              )}
            </div>

            {upcomingTracks.length === 0 ? (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                <p className="text-xs text-[#cec2d6]/70">
                  No manual songs in queue. Next songs will auto-stream seamlessly from recommended music!
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {upcomingTracks.map((track, relativeIdx) => {
                  const actualIdx = queueIndex + 1 + relativeIdx;
                  return (
                    <div
                      key={`${track.id}-${actualIdx}`}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#1b1c24] border border-white/[0.04] hover:bg-[#232430] transition-colors group"
                    >
                      <div
                        onClick={() => onSelectTrack(track, actualIdx)}
                        className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                      >
                        <span className="text-xs font-mono text-[#cec2d6]/50 w-4">
                          {relativeIdx + 1}
                        </span>
                        <img
                          src={track.coverUrl}
                          alt={track.title}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-semibold text-white truncate group-hover:text-[#dbb8ff] transition-colors">
                            {track.title}
                          </h4>
                          <p className="text-[11px] text-[#cec2d6]/70 truncate">
                            {track.artist}
                          </p>
                        </div>
                      </div>

                      {/* Queue Actions: Move & Remove */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {relativeIdx > 0 && (
                          <button
                            title="Move Up"
                            onClick={() => onMoveQueueItem(actualIdx, actualIdx - 1)}
                            className="p-1 text-[#cec2d6]/60 hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-base">arrow_upward</span>
                          </button>
                        )}
                        {relativeIdx < upcomingTracks.length - 1 && (
                          <button
                            title="Move Down"
                            onClick={() => onMoveQueueItem(actualIdx, actualIdx + 1)}
                            className="p-1 text-[#cec2d6]/60 hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-base">arrow_downward</span>
                          </button>
                        )}
                        <button
                          title="Remove from queue"
                          onClick={() => onRemoveFromQueue(actualIdx)}
                          className="p-1 text-[#cec2d6]/50 hover:text-rose-400 transition-colors"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* 3. PREVIOUSLY PLAYED IN THIS SESSION */}
          {previousTracks.length > 0 && (
            <section className="space-y-2 pt-2 border-t border-white/[0.06]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#cec2d6]/60">
                Previously Played ({previousTracks.length})
              </span>

              <div className="space-y-1.5 opacity-75">
                {previousTracks.map((track, idx) => (
                  <div
                    key={`${track.id}-prev-${idx}`}
                    onClick={() => onSelectTrack(track, idx)}
                    className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="material-symbols-outlined text-xs text-[#cec2d6]/40">history</span>
                      <img
                        src={track.coverUrl}
                        alt={track.title}
                        className="w-8 h-8 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-medium text-[#cec2d6] truncate">
                          {track.title}
                        </h5>
                        <p className="text-[10px] text-[#cec2d6]/50 truncate">
                          {track.artist}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#cec2d6]/50">
                      {track.duration}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-white/[0.02] border-t border-white/[0.04] text-center">
          <p className="text-[11px] text-[#cec2d6]/60">
            Songs play continuously without stopping. Add or reorder tracks at any time.
          </p>
        </div>
      </div>
    </div>
  );
};
