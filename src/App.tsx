import { useState, useEffect, useRef } from 'react';
import { TabType, Track, AppTheme } from './types';
import { DEFAULT_NOW_PLAYING_TRACK } from './data/musicData';
import { audioEngine } from './services/audioEngine';
import {
  addToRecentlyPlayed,
  getAppTheme,
  getEndlessQueueTracks,
} from './services/musicService';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MiniPlayer } from './components/MiniPlayer';
import { NowPlayingModal } from './components/NowPlayingModal';
import { QueueModal } from './components/QueueModal';
import { AuthModal } from './components/AuthModal';
import { AudioQualitySelector } from './components/AudioQualitySelector';
import { HomeScreen } from './screens/HomeScreen';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { RadioScreen } from './screens/RadioScreen';
import { StudioScreen } from './screens/StudioScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [currentTrack, setCurrentTrack] = useState<Track>(DEFAULT_NOW_PLAYING_TRACK);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showNowPlayingModal, setShowNowPlayingModal] = useState<boolean>(false);
  const [showQueueModal, setShowQueueModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showQualityModal, setShowQualityModal] = useState<boolean>(false);
  const [studioInitialPrompt, setStudioInitialPrompt] = useState<string | undefined>(undefined);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [appTheme, setAppThemeState] = useState<AppTheme>(getAppTheme());

  // Active queue and playback position
  const [queue, setQueue] = useState<Track[]>([DEFAULT_NOW_PLAYING_TRACK]);
  const [queueIndex, setQueueIndex] = useState<number>(0);

  const queueRef = useRef<Track[]>(queue);
  const queueIndexRef = useRef<number>(queueIndex);

  useEffect(() => {
    queueRef.current = queue;
    queueIndexRef.current = queueIndex;
  }, [queue, queueIndex]);

  // Sync theme changes
  useEffect(() => {
    const handleThemeChange = (e: CustomEvent<AppTheme>) => {
      setAppThemeState(e.detail);
    };
    window.addEventListener('sonic_theme_change', handleThemeChange as EventListener);
    return () => {
      window.removeEventListener('sonic_theme_change', handleThemeChange as EventListener);
    };
  }, []);

  // Synchronize audio engine time updates with the UI progress percent
  useEffect(() => {
    const unsubTime = audioEngine.onTimeUpdate((currentTime, duration) => {
      if (duration > 0) {
        setProgressPercent((currentTime / duration) * 100);
      }
    });

    // Continuous auto-play next song when current track ends: never stop, keep old played songs!
    const unsubEnded = audioEngine.onEnded(() => {
      const q = queueRef.current;
      const idx = queueIndexRef.current;

      if (idx + 1 < q.length) {
        // Play next in queue
        const nextIdx = idx + 1;
        const nextTrack = q[nextIdx];
        setQueueIndex(nextIdx);
        setCurrentTrack(nextTrack);
        addToRecentlyPlayed(nextTrack);
        audioEngine.playTrack(nextTrack);
        setIsPlaying(true);
      } else {
        // Queue reached the end: append fresh endless recommendation tracks and continue uninterrupted!
        const endlessTracks = getEndlessQueueTracks(q, 6);
        const newQueue = [...q, ...endlessTracks];
        const nextIdx = idx + 1;
        const nextTrack = newQueue[nextIdx] || endlessTracks[0];

        setQueue(newQueue);
        setQueueIndex(nextIdx);
        setCurrentTrack(nextTrack);
        addToRecentlyPlayed(nextTrack);
        audioEngine.playTrack(nextTrack);
        setIsPlaying(true);
      }
    });

    return () => {
      unsubTime();
      unsubEnded();
    };
  }, []);

  // Synchronize browser Media Session lock screen/control center handlers with App state
  useEffect(() => {
    audioEngine.setMediaSessionHandlers(
      () => {
        // Toggle play/pause
        if (isPlaying) {
          audioEngine.pause();
          setIsPlaying(false);
        } else {
          if (currentTrack) {
            audioEngine.playTrack(currentTrack);
          } else {
            audioEngine.play();
          }
          setIsPlaying(true);
        }
      },
      () => {
        audioEngine.pause();
        setIsPlaying(false);
      },
      () => {
        handleNextTrack();
      },
      () => {
        handlePrevTrack();
      }
    );
  }, [isPlaying, currentTrack]);

  const togglePlay = () => {
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      if (currentTrack) {
        audioEngine.playTrack(currentTrack);
      } else {
        audioEngine.play();
      }
      setIsPlaying(true);
    }
  };

  const playTrack = (track: Track, newQueue?: Track[]) => {
    setCurrentTrack(track);
    setProgressPercent(0);
    addToRecentlyPlayed(track);

    if (newQueue && newQueue.length > 0) {
      setQueue(newQueue);
      const foundIdx = newQueue.findIndex((t) => t.id === track.id);
      setQueueIndex(foundIdx >= 0 ? foundIdx : 0);
    } else {
      // If single track, keep past history and place track next in queue or switch to it
      setQueue((prevQueue) => {
        const idx = prevQueue.findIndex((t) => t.id === track.id);
        if (idx >= 0) {
          setQueueIndex(idx);
          return prevQueue;
        } else {
          // Insert right after current track, or append
          const updated = [...prevQueue, track];
          setQueueIndex(updated.length - 1);
          return updated;
        }
      });
    }

    audioEngine.playTrack(track);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    const q = queueRef.current;
    const idx = queueIndexRef.current;
    if (q.length === 0) return;

    if (idx + 1 < q.length) {
      const nextIndex = idx + 1;
      const nextTrack = q[nextIndex];
      setQueueIndex(nextIndex);
      setCurrentTrack(nextTrack);
      setProgressPercent(0);
      addToRecentlyPlayed(nextTrack);
      audioEngine.playTrack(nextTrack);
      setIsPlaying(true);
    } else {
      // Fetch endless recommendations
      const endlessTracks = getEndlessQueueTracks(q, 6);
      const newQueue = [...q, ...endlessTracks];
      const nextIndex = idx + 1;
      const nextTrack = newQueue[nextIndex] || endlessTracks[0];
      setQueue(newQueue);
      setQueueIndex(nextIndex);
      setCurrentTrack(nextTrack);
      setProgressPercent(0);
      addToRecentlyPlayed(nextTrack);
      audioEngine.playTrack(nextTrack);
      setIsPlaying(true);
    }
  };

  const handlePrevTrack = () => {
    const curTime = audioEngine.getCurrentTime();
    if (curTime > 3) {
      audioEngine.seek(0);
      setProgressPercent(0);
      return;
    }

    const q = queueRef.current;
    const idx = queueIndexRef.current;
    if (q.length === 0) return;

    const prevIndex = idx <= 0 ? 0 : idx - 1;
    const prevTrack = q[prevIndex];
    setQueueIndex(prevIndex);
    setCurrentTrack(prevTrack);
    setProgressPercent(0);
    addToRecentlyPlayed(prevTrack);
    audioEngine.playTrack(prevTrack);
    setIsPlaying(true);
  };

  // Queue manipulation functions
  const handleRemoveFromQueue = (targetIdx: number) => {
    setQueue((prev) => {
      const nextQ = prev.filter((_, idx) => idx !== targetIdx);
      if (targetIdx < queueIndex) {
        setQueueIndex((cur) => Math.max(0, cur - 1));
      }
      return nextQ;
    });
  };

  const handleMoveQueueItem = (fromIdx: number, toIdx: number) => {
    setQueue((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, item);
      return copy;
    });
  };

  const handleClearUpcoming = () => {
    setQueue((prev) => prev.slice(0, queueIndex + 1));
  };

  const handleStartSession = (tracks: Track[]) => {
    if (tracks.length > 0) {
      playTrack(tracks[0], tracks);
      setShowNowPlayingModal(true);
    }
  };

  const handleOpenStudioWithPrompt = (prompt?: string) => {
    if (prompt) {
      setStudioInitialPrompt(prompt);
    }
    setCurrentTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      data-theme={appTheme}
      className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[#7928ca] selection:text-white transition-colors duration-300"
    >
      {/* Top Header Navigation */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => setCurrentTab(tab)}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenQuality={() => setShowQualityModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-md md:max-w-3xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 transition-opacity duration-200">
        {currentTab === 'home' && (
          <HomeScreen
            onPlayTrack={playTrack}
            onOpenStudio={handleOpenStudioWithPrompt}
            onNavigateTab={setCurrentTab}
            currentTrackId={currentTrack.id}
            isPlaying={isPlaying}
          />
        )}

        {currentTab === 'discover' && (
          <DiscoverScreen
            onPlayTrack={playTrack}
            currentTrackId={currentTrack.id}
            isPlaying={isPlaying}
          />
        )}

        {currentTab === 'radio' && (
          <RadioScreen
            onPlayTrack={playTrack}
            currentTrackId={currentTrack.id}
            isPlaying={isPlaying}
          />
        )}

        {currentTab === 'library' && (
          <LibraryScreen
            onPlayTrack={playTrack}
            onOpenStudio={handleOpenStudioWithPrompt}
            currentTrackId={currentTrack.id}
            isPlaying={isPlaying}
          />
        )}

        {currentTab === 'studio' && (
          <StudioScreen
            onStartSession={handleStartSession}
            onPlaySingleTrack={playTrack}
            initialPrompt={studioInitialPrompt}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileScreen onOpenStudio={handleOpenStudioWithPrompt} />
        )}
      </main>

      {/* Floating MiniPlayer */}
      {!showNowPlayingModal && (
        <MiniPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onOpenNowPlaying={() => setShowNowPlayingModal(true)}
          onOpenStudio={() => setCurrentTab('studio')}
          progressPercent={progressPercent}
        />
      )}

      {/* Full-Screen Now Playing Modal */}
      {showNowPlayingModal && (
        <NowPlayingModal
          track={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onClose={() => setShowNowPlayingModal(false)}
          onNextTrack={handleNextTrack}
          onPrevTrack={handlePrevTrack}
          queue={queue}
          onOpenQueue={() => setShowQueueModal(true)}
          currentTab={currentTab}
          onNavigate={(tab) => {
            setCurrentTab(tab);
            setShowNowPlayingModal(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Play Queue Manager Modal */}
      {showQueueModal && (
        <QueueModal
          currentTrack={currentTrack}
          queue={queue}
          queueIndex={queueIndex}
          isPlaying={isPlaying}
          onClose={() => setShowQueueModal(false)}
          onSelectTrack={(t, idx) => {
            setQueueIndex(idx);
            setCurrentTrack(t);
            addToRecentlyPlayed(t);
            audioEngine.playTrack(t);
            setIsPlaying(true);
          }}
          onRemoveFromQueue={handleRemoveFromQueue}
          onMoveQueueItem={handleMoveQueueItem}
          onClearUpcoming={handleClearUpcoming}
        />
      )}

      {/* Sign Up / Login Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={() => setShowAuthModal(false)}
      />

      {/* Audio Quality Modal */}
      <AudioQualitySelector
        isOpen={showQualityModal}
        onClose={() => setShowQualityModal(false)}
      />

      {/* Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
