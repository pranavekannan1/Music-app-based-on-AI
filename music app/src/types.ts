export type TabType = 'home' | 'discover' | 'radio' | 'library' | 'studio' | 'profile';

export type AudioQuality = '320k' | '160k' | '96k' | '48k';

export type AppTheme = 'dark' | 'light' | 'sunset';

export interface LyricLine {
  time: number;
  original: string;
  english: string;
}

export interface SongLyrics {
  title: string;
  artist: string;
  language: string;
  hasTranslation: boolean;
  lines: LyricLine[];
}

export interface UserAuthProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
  plan: 'Free' | 'Pro' | 'Hi-Fi Master';
  region: string;
  preferredQuality: AudioQuality;
  theme: AppTheme;
  isLoggedIn: boolean;
}

export interface TasteRecommendation {
  reason: string;
  artist: string;
  genre: string;
  tracks: Track[];
}

export interface UserTasteProfile {
  topArtists: { name: string; playCount: number; image?: string }[];
  topGenres: { name: string; playCount: number }[];
  topLanguages: { name: string; playCount: number }[];
  totalStreams: number;
  repeatFavoritesCount: number;
  dominantMood: string;
  recommendations: TasteRecommendation[];
}

export interface MovieSearchResult {
  id: string;
  title: string;
  image: string;
  artist?: string;
  year?: string;
  songCount?: number;
  songs: Track[];
}

export interface ArtistSearchResult {
  id: string;
  name: string;
  image: string;
  role?: string;
  followerCount?: string;
  songs: Track[];
}

export interface PlaylistSearchResult {
  id: string;
  title: string;
  image: string;
  trackCount?: number;
  description?: string;
  songs: Track[];
}

export interface GroupedSearchResults {
  query: string;
  songs: Track[];
  movies: MovieSearchResult[];
  artists: ArtistSearchResult[];
  playlists: PlaylistSearchResult[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  durationSec?: number;
  coverUrl: string;
  previewUrl?: string;
  audioUrl?: string;
  genre?: string;
  country?: string;
  releaseYear?: string;
  appleMusicUrl?: string;
  isLossless?: boolean;
  isExplicit?: boolean;
  isLiked?: boolean;
  isLiveRadio?: boolean;
  isFullSong?: boolean;
  language?: string;
  matchScore?: number;
  tags?: string[];
  bpm?: number;
  isDownloaded?: boolean;
  affinityNote?: string;
  progressPercent?: number;
  freqProfile?: string;
  license?: string;
  licenseUrl?: string;
  attribution?: string;
  isCopyrightSafe?: boolean;
  isRoyaltyFree?: boolean;
  sourceUrl?: string;
}

export interface RadioStation {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  genre: string;
  streamUrl: string;
  favicon?: string;
  bitrate?: number;
  votes?: number;
  language?: string;
  state?: string;
  tagline?: string;
}

export interface UserPlaylist {
  id: string;
  title: string;
  description: string;
  coverUrl?: string;
  tracks: Track[];
  createdAt: number;
}

export interface SmartPlaylist {
  id: string;
  title: string;
  subtitle: string;
  coverUrl?: string;
  badge?: string;
  trackCount: number;
  type: string;
  isLive?: boolean;
}

export interface UserProfile {
  name: string;
  handle: string;
  title: string;
  bio: string;
  avatarUrl: string;
  stats: {
    minutes: string;
    tracks: string;
    discovered: string;
    streakDays: number;
  };
  archetype: {
    name: string;
    description: string;
    curiosityScore: number;
    curiosityPercentile: string;
    curiosityNote: string;
  };
  signature: {
    neoClassical: number;
    downtempo: number;
    atmospheric: number;
    melodicTechno: number;
  };
  tasteEvolution: {
    warmth: string;
    density: string;
    avgTempo: number;
  };
  settings: {
    neuralEngineActive: boolean;
    spatialAudio: string;
    aiDjAutopilot: boolean;
    connectedHardware: string;
  };
}

export interface TelemetryStep {
  id: string;
  label: string;
  detail: string;
  completed: boolean;
}
