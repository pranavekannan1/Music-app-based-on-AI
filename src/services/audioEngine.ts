import { Track } from '../types';

type TimeUpdateCallback = (currentTime: number, duration: number) => void;
type EndedCallback = () => void;

/**
 * Universal Audio Engine for SonicAI
 * Supports:
 * - Real audio streaming via HTMLAudioElement (global iTunes/Apple Music 30-sec previews & direct streams)
 * - Generative ambient harmonic synthesizer (Web Audio API) as fallback/soundscapes
 * - Real-time progress synchronization with onTimeUpdate() & seek()
 * - Frequency analysis for visualizers and live EQ
 */
class AudioEngine {
  private audioEl: HTMLAudioElement | null = null;
  private currentTrack: Track | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.8;
  private isUsingHtmlAudio: boolean = false;

  // Listeners
  private timeListeners: TimeUpdateCallback[] = [];
  private endedListeners: EndedCallback[] = [];

  // Synth mode time simulation
  private synthCurrentTime: number = 0;
  private synthTotalDuration: number = 180;
  private synthTimer: number | null = null;

  // Web Audio Synthesizer components
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private analyser: AnalyserNode | null = null;
  private chordInterval: number | null = null;
  private currentChordIndex: number = 0;

  // Ambient chord progressions in D Minor / F Major (atmospheric, neo-classical)
  private chords = [
    [146.83, 220.0, 261.63, 349.23], // Dm7 (D3, A3, C4, F4)
    [130.81, 196.0, 261.63, 329.63], // Cmaj7 (C3, G3, C4, E4)
    [116.54, 174.61, 220.0, 293.66], // Bbmaj7 (Bb2, F3, A3, D4)
    [146.83, 174.61, 220.0, 329.63], // Dm9 (D3, F3, A3, E4)
  ];

  constructor() {
    // Instantiate HTMLAudioElement if in browser
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (this.audioEl) return;
    this.audioEl = new Audio();
    this.audioEl.crossOrigin = 'anonymous';
    this.audioEl.volume = this.volume;

    this.audioEl.addEventListener('loadedmetadata', () => {
      if (!this.audioEl || !this.isUsingHtmlAudio) return;
      const dur =
        this.audioEl.duration && !isNaN(this.audioEl.duration)
          ? this.audioEl.duration
          : this.currentTrack?.durationSec || 210;
      this.notifyTimeUpdate(this.audioEl.currentTime || 0, dur);
    });

    this.audioEl.addEventListener('timeupdate', () => {
      if (!this.audioEl || !this.isUsingHtmlAudio) return;
      const cur = this.audioEl.currentTime || 0;
      const dur =
        this.audioEl.duration && !isNaN(this.audioEl.duration)
          ? this.audioEl.duration
          : this.currentTrack?.durationSec || 210;
      this.notifyTimeUpdate(cur, dur);
    });

    this.audioEl.addEventListener('ended', () => {
      if (!this.isUsingHtmlAudio) return;
      this.isPlaying = false;
      this.notifyEnded();
    });

    this.audioEl.addEventListener('error', (e) => {
      console.warn('Audio stream playback error, falling back to ambient generative engine:', e);
      // Seamlessly fallback to generative synth so music never abruptly dies
      this.startGenerativeFallback();
    });
  }

  private initWebAudio() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume * 0.35, this.ctx.currentTime);

        this.filter = this.ctx.createBiquadFilter();
        this.filter.type = 'lowpass';
        this.filter.frequency.setValueAtTime(520, this.ctx.currentTime);
        this.filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;

        this.filter.connect(this.masterGain);
        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      }
    }
  }

  /**
   * Subscribe to playback progress updates
   */
  public onTimeUpdate(callback: TimeUpdateCallback): () => void {
    this.timeListeners.push(callback);
    // Initial notify
    const cur = this.getCurrentTime();
    const dur = this.getDuration();
    callback(cur, dur);

    return () => {
      this.timeListeners = this.timeListeners.filter((cb) => cb !== callback);
    };
  }

  /**
   * Subscribe to track ended event
   */
  public onEnded(callback: EndedCallback): () => void {
    this.endedListeners.push(callback);
    return () => {
      this.endedListeners = this.endedListeners.filter((cb) => cb !== callback);
    };
  }

  private notifyTimeUpdate(currentTime: number, duration: number) {
    for (const listener of this.timeListeners) {
      try {
        listener(currentTime, duration);
      } catch (err) {
        console.error('Error in onTimeUpdate listener:', err);
      }
    }
  }

  private notifyEnded() {
    for (const listener of this.endedListeners) {
      try {
        listener();
      } catch (err) {
        console.error('Error in onEnded listener:', err);
      }
    }
  }

  /**
   * Play a specific Track (handles previewUrl or generative synthesis)
   */
  public playTrack(track: Track) {
    this.currentTrack = track;
    const streamUrl = track.audioUrl || track.previewUrl;

    this.updateMediaSession(track);

    if (streamUrl) {
      this.stopGenerativeSynth();
      this.isUsingHtmlAudio = true;
      this.initAudioElement();

      if (this.audioEl) {
        this.audioEl.src = streamUrl;
        this.audioEl.currentTime = 0;
        this.audioEl.volume = this.volume;
        this.audioEl
          .play()
          .then(() => {
            this.isPlaying = true;
            if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
              navigator.mediaSession.playbackState = 'playing';
            }
          })
          .catch((err) => {
            console.warn('HTML Audio play rejected (possibly autoplay restrictions):', err);
            this.startGenerativeFallback();
          });
      }
    } else {
      // No direct audio URL: Play ambient generative synthesizer
      this.startGenerativeFallback();
    }
  }

  private updateMediaSession(track: Track) {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.title,
          artist: track.artist,
          album: track.album || 'SonicAI Master',
          artwork: [
            { src: track.coverUrl, sizes: '96x96', type: 'image/jpeg' },
            { src: track.coverUrl, sizes: '128x128', type: 'image/jpeg' },
            { src: track.coverUrl, sizes: '192x192', type: 'image/jpeg' },
            { src: track.coverUrl, sizes: '256x256', type: 'image/jpeg' },
            { src: track.coverUrl, sizes: '384x384', type: 'image/jpeg' },
            { src: track.coverUrl, sizes: '512x512', type: 'image/jpeg' },
          ]
        });
        navigator.mediaSession.playbackState = 'playing';
      } catch (e) {
        console.warn('Media Session Metadata construction failed:', e);
      }
    }
  }

  public setMediaSessionHandlers(onPlay: () => void, onPause: () => void, onNext: () => void, onPrev: () => void) {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
      try {
        navigator.mediaSession.setActionHandler('play', onPlay);
        navigator.mediaSession.setActionHandler('pause', onPause);
        navigator.mediaSession.setActionHandler('nexttrack', onNext);
        navigator.mediaSession.setActionHandler('previoustrack', onPrev);
        navigator.mediaSession.setActionHandler('seekto', (details) => {
          if (details.seekTime !== undefined) {
            this.seek(details.seekTime);
          }
        });
      } catch (err) {
        console.warn('Failed to bind media session action handlers:', err);
      }
    }
  }

  private startGenerativeFallback() {
    this.isUsingHtmlAudio = false;
    if (this.audioEl) {
      this.audioEl.pause();
    }

    this.synthCurrentTime = 0;
    this.synthTotalDuration = this.currentTrack?.durationSec || 180;
    this.playGenerativeSynth();

    // Start progress timer
    if (this.synthTimer) {
      window.clearInterval(this.synthTimer);
    }
    this.synthTimer = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.synthCurrentTime += 1;
      if (this.synthCurrentTime >= this.synthTotalDuration) {
        this.isPlaying = false;
        if (this.synthTimer) {
          window.clearInterval(this.synthTimer);
          this.synthTimer = null;
        }
        this.notifyEnded();
      } else {
        this.notifyTimeUpdate(this.synthCurrentTime, this.synthTotalDuration);
      }
    }, 1000);
  }

  public play() {
    if (this.isPlaying) return;

    if (this.isUsingHtmlAudio && this.audioEl && this.audioEl.src) {
      this.audioEl
        .play()
        .then(() => {
          this.isPlaying = true;
          if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'playing';
          }
        })
        .catch(() => {
          this.startGenerativeFallback();
        });
    } else if (this.currentTrack) {
      this.playTrack(this.currentTrack);
    } else {
      this.playGenerativeSynth();
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused';
    }
    this.stopGenerativeSynth();
    if (this.synthTimer) {
      window.clearInterval(this.synthTimer);
      this.synthTimer = null;
    }
  }

  public seek(seconds: number) {
    if (this.isUsingHtmlAudio && this.audioEl && !isNaN(this.audioEl.duration)) {
      this.audioEl.currentTime = Math.max(0, Math.min(seconds, this.audioEl.duration));
      this.notifyTimeUpdate(this.audioEl.currentTime, this.audioEl.duration);
    } else {
      this.synthCurrentTime = Math.max(0, Math.min(seconds, this.synthTotalDuration));
      this.notifyTimeUpdate(this.synthCurrentTime, this.synthTotalDuration);
    }
  }

  public getCurrentTime(): number {
    if (this.isUsingHtmlAudio && this.audioEl) {
      return this.audioEl.currentTime || 0;
    }
    return this.synthCurrentTime;
  }

  public getDuration(): number {
    if (this.isUsingHtmlAudio && this.audioEl && this.audioEl.duration && !isNaN(this.audioEl.duration)) {
      return this.audioEl.duration;
    }
    return this.currentTrack?.durationSec || this.synthTotalDuration;
  }

  public getCurrentTrack(): Track | null {
    return this.currentTrack;
  }

  public getPlaybackState(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioEl) {
      this.audioEl.volume = this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume * 0.35, this.ctx.currentTime);
    }
  }

  // --- Generative Web Audio API Helpers ---

  private playGenerativeSynth() {
    this.initWebAudio();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;

    this.playChord(this.chords[this.currentChordIndex]);

    if (this.chordInterval) {
      window.clearInterval(this.chordInterval);
    }
    this.chordInterval = window.setInterval(() => {
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
      this.playChord(this.chords[this.currentChordIndex]);
    }, 6000);
  }

  private stopGenerativeSynth() {
    if (this.chordInterval) {
      window.clearInterval(this.chordInterval);
      this.chordInterval = null;
    }
    if (this.ctx) {
      const now = this.ctx.currentTime;
      this.oscillators.forEach((osc) => {
        try {
          osc.stop(now + 0.3);
        } catch {
          // ignore
        }
      });
      this.oscillators = [];
    }
  }

  private playChord(frequencies: number[]) {
    if (!this.ctx || !this.filter) return;
    const now = this.ctx.currentTime;

    this.oscillators.forEach((osc) => {
      try {
        osc.stop(now + 1.2);
      } catch {
        // ignore
      }
    });
    this.oscillators = [];

    frequencies.forEach((freq, idx) => {
      if (!this.ctx || !this.filter) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime((idx - 1.5) * 4, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 1.5);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 5.0);

      osc.connect(gain);
      gain.connect(this.filter);
      osc.start(now);
      this.oscillators.push(osc);
    });
  }

  public getFrequencyData(): Uint8Array {
    if (this.analyser && this.isPlaying) {
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(dataArray);

      // Check if real signal exists
      const sum = dataArray.reduce((acc, v) => acc + v, 0);
      if (sum > 10) {
        return dataArray;
      }
    }

    // Dynamic simulated frequency data if stream is playing via HTMLAudioElement
    // to give lively EQ visualizations across devices
    if (this.isPlaying) {
      const simulated = new Uint8Array(32);
      const time = Date.now() * 0.005;
      for (let i = 0; i < 32; i++) {
        const wave = Math.sin(time + i * 0.3) * 0.5 + 0.5;
        const wave2 = Math.cos(time * 0.8 + i * 0.5) * 0.5 + 0.5;
        simulated[i] = Math.floor((wave * 0.6 + wave2 * 0.4) * 180 + 40);
      }
      return simulated;
    }

    return new Uint8Array(32).fill(0);
  }
}

export const audioEngine = new AudioEngine();
