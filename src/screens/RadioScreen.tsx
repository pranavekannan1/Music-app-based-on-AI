import React, { useState, useEffect } from 'react';
import { Track, RadioStation } from '../types';
import {
  getIndianPriorityRadios,
  getLiveWorldRadio,
  convertRadioToTrack,
  saveLikedTrack,
  isTrackLiked,
} from '../services/musicService';

interface RadioScreenProps {
  onPlayTrack: (track: Track) => void;
  currentTrackId?: string;
  isPlaying?: boolean;
}

export const RadioScreen: React.FC<RadioScreenProps> = ({
  onPlayTrack,
  currentTrackId,
  isPlaying,
}) => {
  const [priorityRadios, setPriorityRadios] = useState<RadioStation[]>([]);
  const [worldStations, setWorldStations] = useState<RadioStation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const radioLanguages = [
    { id: 'ALL', name: 'All India', flag: '🇮🇳' },
    { id: 'Hindi', name: 'Hindi Hits', flag: '🎬' },
    { id: 'Punjabi', name: 'Punjabi Beats', flag: '🌾' },
    { id: 'Tamil', name: 'Tamil Waves', flag: '🌴' },
    { id: 'Telugu', name: 'Telugu Live', flag: '⚡' },
    { id: 'Malayalam', name: 'Malayalam', flag: '🥥' },
    { id: 'Devotional', name: 'Bhakti & Peace', flag: '🪔' },
    { id: 'WORLD', name: 'Worldwide Live', flag: '🌐' },
  ];

  useEffect(() => {
    loadAllRadios();
  }, []);

  const loadAllRadios = async () => {
    setIsLoading(true);
    try {
      const [indianList, worldList] = await Promise.all([
        getIndianPriorityRadios(),
        getLiveWorldRadio('IN'),
      ]);
      setPriorityRadios(indianList);
      setWorldStations(worldList);
    } catch {
      // Handled
    } finally {
      setIsLoading(false);
    }
  };

  const handleStationPlay = (station: RadioStation) => {
    const track = convertRadioToTrack(station);
    onPlayTrack(track);
    setToastMessage(`Streaming live: ${station.name}`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleLike = (e: React.MouseEvent, station: RadioStation) => {
    e.stopPropagation();
    const track = convertRadioToTrack(station);
    const liked = saveLikedTrack(track);
    setToastMessage(liked ? `Saved "${station.name}" to Library` : `Removed "${station.name}"`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  // Filter priority stations by language & search
  const filteredPriority = priorityRadios.filter((s) => {
    const matchesLang =
      selectedLanguage === 'ALL' ||
      selectedLanguage === 'WORLD' ||
      s.language?.toLowerCase() === selectedLanguage.toLowerCase();

    if (!matchesLang) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      (s.genre && s.genre.toLowerCase().includes(q)) ||
      (s.tagline && s.tagline.toLowerCase().includes(q)) ||
      (s.language && s.language.toLowerCase().includes(q))
    );
  });

  // World stations filter
  const filteredWorld = worldStations.filter((s) => {
    if (selectedLanguage !== 'ALL' && selectedLanguage !== 'WORLD') return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.genre.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col w-full space-y-6 pb-36 pt-2">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#7928ca] text-white text-xs font-semibold rounded-full shadow-lg border border-[#dbb8ff]/30 backdrop-blur-md animate-fade-in pointer-events-none">
          {toastMessage}
        </div>
      )}

      {/* Screen Header */}
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
          <span className="text-[11px] uppercase tracking-widest text-[#ff9933] font-bold">
            Live On-Air Broadcasts
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e3e2e8] font-display">
          Live Radio Stations
        </h1>
        <p className="text-xs text-[#cec2d6]/80 leading-relaxed">
          High-uptime live radio streams: All India Radio (Vividh Bharati), AIR Stations, Radio Madhuban 90.4 FM, Devotional, Classical, and Global Broadcasts.
        </p>
      </div>

      {/* Search live stations */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#cec2d6]/60 text-lg">
          podcasts
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Indian & global radios (e.g. Mirchi, Red FM, Vividh Bharati, Tamil, Bhakti)..."
          className="w-full bg-[#1b1c20] text-sm text-[#e3e2e8] placeholder-[#cec2d6]/50 pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#ff9933]/60 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#cec2d6]/60 hover:text-white"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
      </div>

      {/* Regional Language Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
        {radioLanguages.map((l) => {
          const isSelected = selectedLanguage === l.id;
          return (
            <button
              key={l.id}
              onClick={() => setSelectedLanguage(l.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#ff9933] to-[#e91e63] text-white shadow-[0_0_12px_rgba(255,153,51,0.3)] scale-105'
                  : 'bg-[#1e1f24] text-[#cec2d6] hover:bg-[#282930] hover:text-[#e3e2e8]'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.name}</span>
            </button>
          );
        })}
      </div>

      {/* Priority Featured Indian Stations (Hero Grid) */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff9933] text-base">star</span>
            <h2 className="text-sm font-bold text-[#e3e2e8] uppercase tracking-wider">
              Priority Indian On-Air ({filteredPriority.length})
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#138808] bg-[#138808]/15 px-2 py-0.5 rounded-full border border-[#138808]/30">
            24/7 LIVE
          </span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-8 h-8 border-2 border-[#ff9933]/20 border-t-[#ff9933] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredPriority.map((station) => {
              const trackId = `radio_${station.id}`;
              const isCurrent = currentTrackId === trackId;
              const isPlayingThis = isCurrent && isPlaying;
              const liked = isTrackLiked(trackId, station.name);

              return (
                <div
                  key={station.id}
                  onClick={() => handleStationPlay(station)}
                  className={`group relative flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer border ${
                    isPlayingThis
                      ? 'bg-[#ff9933]/15 border-[#ff9933]/50 shadow-[0_4px_20px_rgba(255,153,51,0.15)]'
                      : 'bg-[#1a1b20] border-white/[0.05] hover:bg-[#23242c]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#292a2e] shadow-md">
                      <img
                        src={station.favicon}
                        alt={station.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80';
                        }}
                      />
                      {isPlayingThis ? (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="flex items-end gap-0.5 h-4">
                            <span className="w-1 bg-[#ff9933] h-full animate-pulse"></span>
                            <span className="w-1 bg-rose-500 h-2/3 animate-pulse delay-75"></span>
                            <span className="w-1 bg-[#138808] h-4/5 animate-pulse delay-150"></span>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 flex items-center justify-center transition-all">
                          <span className="material-symbols-outlined text-white text-lg">
                            play_arrow
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-[#e3e2e8] truncate group-hover:text-[#ff9933] transition-colors">
                          {station.name}
                        </h4>
                        {station.language && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#ff9933]/20 text-[#ffb066] border border-[#ff9933]/30 flex-shrink-0">
                            {station.language}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#cec2d6]/70 truncate mt-0.5">
                        {station.tagline || station.genre}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-2">
                    <button
                      onClick={(e) => handleToggleLike(e, station)}
                      className={`p-1.5 transition-colors ${
                        liked ? 'text-rose-500' : 'text-[#cec2d6]/50 hover:text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {liked ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Additional Indian & Global Live Streams */}
      {filteredWorld.length > 0 && (
        <section className="flex flex-col space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#e3e2e8] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#dbb8ff]">public</span>
              <span>All India & Global Streams ({filteredWorld.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-1">
            {filteredWorld.map((station) => {
              const trackId = `radio_${station.id}`;
              const isCurrent = currentTrackId === trackId;
              const isPlayingThis = isCurrent && isPlaying;
              return (
                <div
                  key={station.id}
                  onClick={() => handleStationPlay(station)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                    isPlayingThis
                      ? 'bg-[#7928ca]/25 border border-[#dbb8ff]/40'
                      : 'bg-[#1a1b20] border border-white/[0.04] hover:bg-[#23242c]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#292a2e]">
                    <img
                      src={station.favicon}
                      alt={station.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80';
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-semibold text-[#e3e2e8] truncate">
                      {station.name}
                    </h4>
                    <p className="text-[10px] text-[#cec2d6]/70 truncate">
                      {station.genre || station.language || 'Live Radio'}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-sm text-[#cec2d6]/60">
                    {isPlayingThis ? 'volume_up' : 'play_arrow'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
