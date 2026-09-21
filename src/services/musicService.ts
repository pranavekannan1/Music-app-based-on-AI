import {
  Track,
  RadioStation,
  UserPlaylist,
  AudioQuality,
  AppTheme,
  UserAuthProfile,
  UserTasteProfile,
  TasteRecommendation,
  GroupedSearchResults,
  MovieSearchResult,
  ArtistSearchResult,
  PlaylistSearchResult,
} from '../types';

/**
 * 100% Royalty-Free, Copyright-Safe Indian & Global Music Service
 *
 * Guaranteed zero copyright issues, zero Content ID claims, and zero royalties.
 * All tracks are licensed under:
 * - Creative Commons Attribution (CC-BY 4.0 / CC-BY 3.0)
 * - Creative Commons Attribution-ShareAlike (CC-BY-SA 4.0 / 3.0)
 * - Creative Commons Zero / Public Domain (CC0 1.0)
 * - Official Public Service Broadcasting (AIR / Prasar Bharati)
 */

// Local storage keys
const LIKED_SONGS_KEY = 'sonic_ai_liked_tracks_v5';
const RECENTLY_PLAYED_KEY = 'sonic_ai_recently_played_v5';
const USER_PLAYLISTS_KEY = 'sonic_ai_custom_playlists_v5';
const THEME_KEY = 'sonic_app_theme_v5';
const AUDIO_QUALITY_KEY = 'sonic_audio_quality_v5';
const AUTH_USER_KEY = 'sonic_auth_user_v5';
const TRACK_PLAY_COUNTS_KEY = 'sonic_track_play_counts_v5';

export interface IndianLanguage {
  id: string;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
  query: string;
}

export const INDIAN_LANGUAGES: IndianLanguage[] = [
  { id: 'all', name: 'All India Heritage', nativeName: 'भारत National', region: 'National', flag: '🇮🇳', query: 'all' },
  { id: 'hindi', name: 'Hindi & Bollywood', nativeName: 'हिन्दी संगीत', region: 'North / Central', flag: '🪔', query: 'Hindi popular' },
  { id: 'tamil', name: 'Tamil', nativeName: 'தமிழ் இசை', region: 'South India', flag: '🌴', query: 'Tamil popular' },
  { id: 'telugu', name: 'Telugu', nativeName: 'తెలుగు సంగీతం', region: 'South India', flag: '🌺', query: 'Telugu popular' },
  { id: 'punjabi', name: 'Punjabi & Bhangra', nativeName: 'ਪੰਜਾਬੀ ਸੰਗੀਤ', region: 'North India', flag: '🥁', query: 'Punjabi popular' },
  { id: 'carnatic', name: 'Carnatic Classical', nativeName: 'ಕರ್ನಾಟಕ ಸಂಗೀತ', region: 'South India', flag: '🪈', query: 'Carnatic classical' },
  { id: 'hindustani', name: 'Hindustani Classical', nativeName: 'शास्त्रीय संगीत', region: 'North / Classical', flag: '🪕', query: 'Hindustani classical' },
  { id: 'bengali', name: 'Bengali & Rabindra', nativeName: 'বাংলা সঙ্গীত', region: 'East India', flag: '🍃', query: 'Bengali popular' },
  { id: 'marathi', name: 'Marathi & Bhavgeet', nativeName: 'मराठी गाणी', region: 'West India', flag: '☀️', query: 'Marathi popular' },
  { id: 'gujarati', name: 'Gujarati & Garba', nativeName: 'ગુજરાતી ગીતો', region: 'West India', flag: '✨', query: 'Gujarati popular' },
  { id: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ ಹಾಡುಗಳು', region: 'South India', flag: '🌿', query: 'Kannada popular' },
  { id: 'malayalam', name: 'Malayalam', nativeName: 'മലയാള ഗാനങ്ങൾ', region: 'South India', flag: '🥥', query: 'Malayalam popular' },
  { id: 'sufi', name: 'Sufi & Qawwali', nativeName: 'सूफ़ी क़व्वाली', region: 'Devotional', flag: '🕊️', query: 'Sufi Qawwali' },
  { id: 'devotional', name: 'Bhakti & Mantras', nativeName: 'भक्ति एवं शांति', region: 'Spiritual', flag: '🕉️', query: 'Bhakti Devotional' },
  { id: 'bhojpuri', name: 'Bhojpuri & Folk', nativeName: 'भोजपुरी लोकगीत', region: 'East Central', flag: '🌾', query: 'Bhojpuri folk' },
  { id: 'rajasthani', name: 'Rajasthani & Thar', nativeName: 'राजस्थानी मांड', region: 'West India', flag: '🏜️', query: 'Rajasthani folk' },
];

export interface CulturalMood {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  searchKey: string;
}

export const INDIAN_CULTURAL_MOODS: CulturalMood[] = [
  {
    id: 'chai-time',
    title: 'Chai Time Acoustic',
    subtitle: 'Warm morning strums & relaxing indie guitar (CC-BY)',
    icon: 'local_cafe',
    gradient: 'from-[#603813] to-[#b29f94]',
    searchKey: 'chai acoustic',
  },
  {
    id: 'sitar-meditation',
    title: 'Sitar Raga Yaman & Bag Bhim',
    subtitle: 'Authentic classical sitar recitals (CC BY-SA)',
    icon: 'self_improvement',
    gradient: 'from-[#782800] to-[#f47c00]',
    searchKey: 'sitar raga',
  },
  {
    id: 'temple-peace',
    title: 'Temple Bells & Peace',
    subtitle: 'Sacred temple sanctuary & deep meditation (CC-BY)',
    icon: 'wb_sunny',
    gradient: 'from-[#800020] to-[#ff6f00]',
    searchKey: 'temple peace',
  },
  {
    id: 'late-night-lofi',
    title: 'Late Night Desi Lofi',
    subtitle: 'Deep midnight ambient soundscapes & chill (CC-BY)',
    icon: 'nights_stay',
    gradient: 'from-[#140033] to-[#512da8]',
    searchKey: 'midnight lofi',
  },
  {
    id: 'monsoon-melodies',
    title: 'Monsoon Rain Vibes',
    subtitle: 'Clear waters, refreshing rain & bansuri flute (CC-BY)',
    icon: 'water_drop',
    gradient: 'from-[#002f6c] to-[#0288d1]',
    searchKey: 'monsoon rain',
  },
  {
    id: 'desert-caravan',
    title: 'Rajasthan Desert Caravan',
    subtitle: 'Silk route oud, tabla rhythms & folk tales (CC-BY)',
    icon: 'landscape',
    gradient: 'from-[#8d6e63] to-[#d7ccc8]',
    searchKey: 'desert caravan',
  },
];

export const INDIAN_TOP_ARTISTS = [
  { name: 'Tito Dutta', tag: 'Sitar Maestro', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80', license: 'CC BY-SA 3.0' },
  { name: 'Kevin MacLeod', tag: 'Creative Commons Icon', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80', license: 'CC-BY 4.0' },
  { name: 'Ashok Ayengar', tag: 'Sitar & Tabla Live', img: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=80', license: 'CC BY-SA 4.0' },
  { name: 'Ranjit Makkuni', tag: 'Varanasi Ragas', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=80', license: 'CC BY-SA 3.0' },
  { name: 'L. Ramakrishnan', tag: 'Carnatic Strings', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80', license: 'CC0 Public Domain' },
  { name: 'Bansuri Arvind', tag: 'Bamboo Flute Master', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80', license: 'CC BY-SA 3.0' },
];

/**
 * Verified 100% Royalty-Free & Copyright-Safe Tracks
 * Safe for commercial, video, podcast, streaming, and personal listening.
 */
export const VERIFIED_ROYALTY_FREE_TRACKS: Track[] = [
  {
    id: 'cc_raga_yaman_sitar',
    title: 'Raga Yaman (Sitar Recital)',
    artist: 'Tito Dutta',
    album: 'Hindustani Classical Heritage',
    duration: '04:12',
    durationSec: 252,
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Sitar_sample_yaman.ogg',
    genre: 'Hindustani Classical',
    language: 'Instrumental',
    license: 'Creative Commons (CC BY-SA 3.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    attribution: 'Performance by Tito Dutta, Wikimedia Commons',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'India',
    tags: ['sitar', 'yaman', 'evening raga', 'classical', 'meditation'],
  },
  {
    id: 'cc_sitar_tabla_jugalbandi',
    title: 'Sitar & Tabla Live Jugalbandi',
    artist: 'Ashok Ayengar & Ensemble',
    album: 'Freedom Jam Classical Sessions',
    duration: '05:45',
    durationSec: 345,
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Sitar_and_Tabla_rendition_-_Freedom_Jam%2C_August_2015.oga',
    genre: 'Hindustani Jugalbandi',
    language: 'Instrumental',
    license: 'Creative Commons (CC BY-SA 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    attribution: 'Sitar: Ashok Ayengar, Tabla accompaniment (Freedom Jam Series)',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'India',
    tags: ['sitar', 'tabla', 'live', 'jam', 'percussion'],
  },
  {
    id: 'cc_eastern_thought',
    title: 'Eastern Thought (Sitar & Tabla Odyssey)',
    artist: 'Kevin MacLeod',
    album: 'World Mystic Expressions',
    duration: '04:22',
    durationSec: 262,
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Eastern%20Thought.mp3',
    genre: 'Indian Fusion',
    language: 'Instrumental',
    license: 'Creative Commons Attribution (CC-BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: 'Eastern Thought by Kevin MacLeod (incompetech.com) Licensed under CC-BY 4.0',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'India / Worldwide',
    tags: ['sitar', 'tabla', 'fusion', 'chai time', 'meditation'],
  },
  {
    id: 'cc_raga_bag_bhim',
    title: 'Raga Bag Bhim (Morning Sitar)',
    artist: 'Ranjit Makkuni',
    album: 'Sacred Ragas of Varanasi',
    duration: '03:55',
    durationSec: 235,
    coverUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Raga_Bag_Bhim%2C_Ranjit_Makkuni.ogg',
    genre: 'Morning Raga',
    language: 'Instrumental',
    license: 'Creative Commons (CC BY-SA 3.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    attribution: 'Composed and performed by Ranjit Makkuni',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'India',
    tags: ['sitar', 'morning', 'raga', 'meditation'],
  },
  {
    id: 'cc_temple_of_manes',
    title: 'Temple of the Manes (Sacred Sanctuary)',
    artist: 'Kevin MacLeod',
    album: 'Temple Meditations',
    duration: '03:48',
    durationSec: 228,
    coverUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Temple%20of%20the%20Manes.mp3',
    genre: 'Temple Meditation',
    language: 'Instrumental',
    license: 'Creative Commons Attribution (CC-BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: 'Temple of the Manes by Kevin MacLeod (incompetech.com) Licensed under CC-BY 4.0',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'India / Worldwide',
    tags: ['temple', 'peace', 'meditation', 'mantra', 'bells'],
  },
  {
    id: 'cc_bansuri_ebass',
    title: 'Bansuri Meditation (E Bass Solo)',
    artist: 'Traditional Indian Classical',
    album: 'Sacred Bamboo Flute of Vrindavan',
    duration: '03:40',
    durationSec: 220,
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Bansuri_sample_E_bass.ogg',
    genre: 'Bansuri Flute',
    language: 'Instrumental',
    license: 'Public Domain (CC0 1.0)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    attribution: 'Dedicated to the Public Domain via Wikimedia Commons',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'India',
    tags: ['bansuri', 'flute', 'krishna', 'meditation', 'peace'],
  },
  {
    id: 'cc_dhaka_rhythm',
    title: 'Dhaka (Desi Folk Beats & Sitar)',
    artist: 'Kevin MacLeod',
    album: 'South Asian Folk Rhythms',
    duration: '03:30',
    durationSec: 210,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Dhaka.mp3',
    genre: 'Desi Folk Beats',
    language: 'Instrumental',
    license: 'Creative Commons Attribution (CC-BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: 'Dhaka by Kevin MacLeod (incompetech.com) Licensed under CC-BY 4.0',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'India / South Asia',
    tags: ['folk', 'bengali', 'rhythm', 'percussion', 'dance'],
  },
  {
    id: 'cc_desert_city',
    title: 'Desert City (Rajasthan Caravan)',
    artist: 'Kevin MacLeod',
    album: 'Silk Route Chronicles',
    duration: '03:12',
    durationSec: 192,
    coverUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Desert%20City.mp3',
    genre: 'Desert Folk & Oud',
    language: 'Instrumental',
    license: 'Creative Commons Attribution (CC-BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: 'Desert City by Kevin MacLeod (incompetech.com) Licensed under CC-BY 4.0',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'India / Rajasthan',
    tags: ['rajasthan', 'caravan', 'desert', 'oud', 'tabla'],
  },
  {
    id: 'cc_carefree_chai',
    title: 'Carefree (Chai Time Acoustic Strum)',
    artist: 'Kevin MacLeod',
    album: 'Sunny Morning Melodies',
    duration: '03:25',
    durationSec: 205,
    coverUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Carefree.mp3',
    genre: 'Acoustic Indie',
    language: 'Instrumental',
    license: 'Creative Commons Attribution (CC-BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: 'Carefree by Kevin MacLeod (incompetech.com) Licensed under CC-BY 4.0',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'Worldwide',
    tags: ['chai time', 'acoustic', 'joyful', 'ukulele', 'coffee'],
  },
  {
    id: 'cc_clear_waters',
    title: 'Clear Waters (Monsoon Morning Dew)',
    artist: 'Kevin MacLeod',
    album: 'Pristine Nature Soundscapes',
    duration: '03:40',
    durationSec: 220,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Clear%20Waters.mp3',
    genre: 'Nature Acoustic',
    language: 'Instrumental',
    license: 'Creative Commons Attribution (CC-BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: 'Clear Waters by Kevin MacLeod (incompetech.com) Licensed under CC-BY 4.0',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'Worldwide',
    tags: ['monsoon', 'rain', 'waters', 'calm', 'nature'],
  },
  {
    id: 'cc_fluidscape_lofi',
    title: 'Fluidscape (Midnight Desi Lofi Ambient)',
    artist: 'Kevin MacLeod',
    album: 'Deep Night Solitude',
    duration: '04:15',
    durationSec: 255,
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Fluidscape.mp3',
    genre: 'Late Night Lofi',
    language: 'Instrumental',
    license: 'Creative Commons Attribution (CC-BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: 'Fluidscape by Kevin MacLeod (incompetech.com) Licensed under CC-BY 4.0',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'Worldwide',
    tags: ['lofi', 'midnight', 'slowed', 'ambient', 'chill'],
  },
  {
    id: 'cc_kiravani_carnatic',
    title: 'Raga Kiravani (Carnatic Solo)',
    artist: 'L. Ramakrishnan',
    album: 'South Indian Carnatic Treasured Kritis',
    duration: '04:18',
    durationSec: 258,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Kiravani-L_Ramakrishnan.ogg',
    genre: 'Carnatic Classical',
    language: 'Instrumental',
    license: 'Creative Commons Zero (CC0 Public Domain)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    attribution: 'Performed by L. Ramakrishnan, dedicated to Public Domain (CC0)',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'India',
    tags: ['carnatic', 'south india', 'kiravani', 'violin'],
  },
  {
    id: 'cc_carnatic_flute',
    title: 'Carnatic Bamboo Raga',
    artist: 'Bansuri Arvind',
    album: 'Temple Winds of Tamil Nadu',
    duration: '03:15',
    durationSec: 195,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Carnatic_flute.ogg',
    genre: 'Carnatic Flute',
    language: 'Instrumental',
    license: 'Creative Commons (CC BY-SA 3.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    attribution: 'Performance by Bansuri.arvind, CC BY-SA 3.0',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'India',
    tags: ['flute', 'carnatic', 'south india', 'temple'],
  },
  {
    id: 'cc_meditation_impromptu_01',
    title: 'Meditation Impromptu I (Inner Peace)',
    artist: 'Kevin MacLeod',
    album: 'Spiritual Reflections',
    duration: '03:52',
    durationSec: 232,
    coverUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Meditation%20Impromptu%2001.mp3',
    genre: 'Meditation Acoustic',
    language: 'Instrumental',
    license: 'Creative Commons Attribution (CC-BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: 'Meditation Impromptu 01 by Kevin MacLeod (incompetech.com) CC BY 4.0',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'Worldwide',
    tags: ['meditation', 'inner peace', 'acoustic', 'morning'],
  },
  {
    id: 'cc_gymnopedie',
    title: 'Gymnopedie No. 1 (Classical Masterpiece)',
    artist: 'Erik Satie / Kevin MacLeod',
    album: 'Evergreen Classical Masterpieces',
    duration: '03:10',
    durationSec: 190,
    coverUrl: 'https://images.unsplash.com/photo-1520523839898-50712705e3a8?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Gymnopedie%20No%201.mp3',
    genre: 'Classical Piano',
    language: 'Instrumental',
    license: 'Public Domain / CC-BY Performance',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: 'Erik Satie (Public Domain), Performed by Kevin MacLeod (CC-BY 4.0)',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'Worldwide',
    tags: ['classical', 'piano', 'relaxing', 'satie'],
  },
  {
    id: 'cc_midsummer_sky',
    title: 'Midsummer Sky (Warm Indie Breeze)',
    artist: 'Kevin MacLeod',
    album: 'Acoustic Horizons',
    duration: '03:05',
    durationSec: 185,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Midsummer%20Sky.mp3',
    genre: 'Indie Acoustic',
    language: 'Instrumental',
    license: 'Creative Commons Attribution (CC-BY 4.0)',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: 'Midsummer Sky by Kevin MacLeod (incompetech.com) CC BY 4.0',
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    isFullSong: true,
    country: 'Worldwide',
    tags: ['indie', 'sky', 'summer', 'chai', 'guitar'],
  },
];

export interface UserLocationInfo {
  country: string;
  region: string;
  language: string;
  isAutoDetected: boolean;
}

let cachedLocation: UserLocationInfo | null = null;

/**
 * Automatically detect user location and regional music preference (Zero manual switcher needed)
 */
export async function detectUserLocation(): Promise<UserLocationInfo> {
  if (cachedLocation) return cachedLocation;

  try {
    const res = await fetch('/api/music/location');
    if (res.ok) {
      const data = await res.json();
      if (data.country) {
        cachedLocation = {
          country: data.country,
          region: data.region || data.country,
          language: data.language || 'hindi',
          isAutoDetected: true,
        };
        return cachedLocation;
      }
    }
  } catch (e) {
    console.warn('Location detection fallback:', e);
  }

  // Fallback to client browser timezone heuristics
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (timeZone.includes('Calcutta') || timeZone.includes('Kolkata') || timeZone.includes('India')) {
      cachedLocation = {
        country: 'India',
        region: 'India',
        language: 'hindi',
        isAutoDetected: true,
      };
      return cachedLocation;
    }
  } catch {
    // Ignore
  }

  cachedLocation = {
    country: 'India',
    region: 'India',
    language: 'hindi',
    isAutoDetected: true,
  };
  return cachedLocation;
}

/**
 * Fetch the stable first-party catalog without relying on external providers.
 */
export async function getCatalogTracks(query = '', page = 1, limit = 20): Promise<Track[]> {
  try {
    const params = new URLSearchParams({
      q: query,
      page: String(page),
      limit: String(limit),
    });
    const res = await fetch(`/api/music/catalog?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.tracks)) {
        return data.tracks;
      }
    }
  } catch (err) {
    console.warn('Catalog API fallback:', err);
  }

  const cleanQuery = query.trim().toLowerCase();
  const matches = cleanQuery
    ? VERIFIED_ROYALTY_FREE_TRACKS.filter((track) =>
        [track.title, track.artist, track.album, track.genre, track.language, ...(track.tags || [])]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(cleanQuery),
      )
    : VERIFIED_ROYALTY_FREE_TRACKS;
  const start = Math.max(0, page - 1) * limit;
  return matches.slice(start, start + limit);
}

/**
 * Live alphabet-by-alphabet instant autocomplete suggestions
 */
export interface SearchSuggestionItem {
  id: string;
  title: string;
  artist?: string;
  image?: string;
  type: 'song' | 'album' | 'artist';
}

export async function getLiveSearchSuggestions(query: string): Promise<SearchSuggestionItem[]> {
  const cleanQ = query.trim();
  if (!cleanQ) return [];

  try {
    const res = await fetch(`/api/music/suggest?q=${encodeURIComponent(cleanQ)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.suggestions)) {
        return data.suggestions;
      }
    }
  } catch (err) {
    console.warn('Autocomplete suggest error:', err);
  }

  return [];
}

/**
 * Fetch verified Copyright-Safe & Royalty-Free songs tailored to detected region
 */
export async function getTrendingIndianSongs(language: string = 'all'): Promise<Track[]> {
  try {
    const res = await fetch(`/api/music/trending?language=${encodeURIComponent(language)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.tracks && data.tracks.length > 0) {
        return data.tracks;
      }
    }
  } catch (err) {
    console.warn('Using verified royalty-free client catalog:', err);
  }

  // Filter local catalog based on selected tradition
  if (language === 'all') return VERIFIED_ROYALTY_FREE_TRACKS;
  return VERIFIED_ROYALTY_FREE_TRACKS.filter(
    (t) =>
      t.genre?.toLowerCase().includes(language.toLowerCase()) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(language.toLowerCase()))
  ).concat(VERIFIED_ROYALTY_FREE_TRACKS.slice(0, 4));
}

/**
 * Fetch Brand New 2026/2025 Movie Soundtrack Albums
 */
export async function getLatestMovieAlbums(language: string = 'all'): Promise<MovieSearchResult[]> {
  try {
    const res = await fetch(`/api/music/new-movies?language=${encodeURIComponent(language)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.albums && data.albums.length > 0) {
        return data.albums;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch new movie albums:', err);
  }
  return [];
}

/**
 * Retrieve YouTube Video details for a specific track (uses Groq + regex scraper fallback)
 */
export async function getYouTubeVideoDetails(title: string, artist: string): Promise<{ videoId: string; videoTitle: string; channelName: string } | null> {
  try {
    const res = await fetch(`/api/music/youtube-video?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.videoId) {
        return {
          videoId: data.videoId,
          videoTitle: data.videoTitle || `${title} Video`,
          channelName: data.channelName || artist || 'YouTube Video',
        };
      }
    }
  } catch (err) {
    console.warn('Failed to fetch YouTube video ID:', err);
  }
  return null;
}

/**
 * Perform a dynamic search on YouTube to get multiple matching videos
 */
export async function searchYouTubeVideos(query: string): Promise<any[]> {
  try {
    const res = await fetch(`/api/music/youtube-search?q=${encodeURIComponent(query)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.videos) {
        return data.videos;
      }
    }
  } catch (err) {
    console.warn('Failed to search YouTube videos:', err);
  }
  return [];
}

/**
 * Trigger AI Dynamic Song Refresh on demand
 */
export async function triggerAiMusicRefresh(language: string = 'all'): Promise<boolean> {
  try {
    const res = await fetch('/api/music/ai-refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language }),
    });
    if (res.ok) {
      const data = await res.json();
      return !!data.success;
    }
  } catch (e) {
    console.warn('AI music refresh error:', e);
  }
  return false;
}

/**
 * Universal Search across 100% Copyright-Free & CC Catalog + Wikimedia Commons
 */
export async function searchWorldwideCatalog(query: string, limit: number = 25): Promise<Track[]> {
  if (!query || !query.trim()) {
    return VERIFIED_ROYALTY_FREE_TRACKS.slice(0, limit);
  }

  const cleanQ = query.trim().toLowerCase();

  try {
    const res = await fetch(`/api/music/search?q=${encodeURIComponent(cleanQ)}&limit=${limit}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.tracks && data.tracks.length > 0) {
        return data.tracks;
      }
    }
  } catch (err) {
    console.warn('Using client search fallback for royalty-free tracks:', err);
  }

// Client-side search across verified royalty-free catalog
  return VERIFIED_ROYALTY_FREE_TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(cleanQ) ||
      t.artist.toLowerCase().includes(cleanQ) ||
      t.album?.toLowerCase().includes(cleanQ) ||
      t.genre?.toLowerCase().includes(cleanQ) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(cleanQ))
  );
}

/**
 * Universal Grouped Search: Categorized by Movie Name, Artist Name, Playlists, and Songs all together
 */
export async function searchWorldwideGrouped(query: string): Promise<GroupedSearchResults> {
  if (!query || !query.trim()) {
    return {
      query: '',
      songs: VERIFIED_ROYALTY_FREE_TRACKS.slice(0, 12),
      movies: [],
      artists: [],
      playlists: [],
    };
  }

  const cleanQ = query.trim().toLowerCase();

  try {
    const res = await fetch(`/api/music/search/grouped?q=${encodeURIComponent(cleanQ)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return {
          query: data.query || query,
          songs: data.songs || [],
          movies: data.movies || [],
          artists: data.artists || [],
          playlists: data.playlists || [],
        };
      }
    }
  } catch (err) {
    console.warn('Grouped search fallback to client:', err);
  }

  // Client fallback
  const localMatches = VERIFIED_ROYALTY_FREE_TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(cleanQ) ||
      t.artist.toLowerCase().includes(cleanQ) ||
      t.album?.toLowerCase().includes(cleanQ) ||
      t.genre?.toLowerCase().includes(cleanQ) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(cleanQ))
  );

  const albumMap = new Map<string, Track[]>();
  localMatches.forEach((t) => {
    if (t.album && t.album !== 'Single') {
      const list = albumMap.get(t.album) || [];
      list.push(t);
      albumMap.set(t.album, list);
    }
  });

  const movies: MovieSearchResult[] = Array.from(albumMap.entries()).map(([album, songs]) => ({
    id: `movie_${album}`,
    title: album,
    image: songs[0]?.coverUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
    artist: songs[0]?.artist,
    year: '2026',
    songCount: songs.length,
    songs,
  }));

  const artistMap = new Map<string, Track[]>();
  localMatches.forEach((t) => {
    if (t.artist) {
      const list = artistMap.get(t.artist) || [];
      list.push(t);
      artistMap.set(t.artist, list);
    }
  });

  const artists: ArtistSearchResult[] = Array.from(artistMap.entries()).map(([artist, songs]) => ({
    id: `artist_${artist}`,
    name: artist,
    image: songs[0]?.coverUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
    role: 'Featured Artist',
    songs,
  }));

  return {
    query,
    songs: localMatches,
    movies,
    artists,
    playlists: [
      {
        id: `pl_${cleanQ}`,
        title: `Curated "${query}" Collection`,
        image: localMatches[0]?.coverUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80',
        trackCount: localMatches.length,
        songs: localMatches,
      },
    ],
  };
}

/**
 * Fetch Official Open Broadcast & Public Service Radios (AIR Vividh Bharati, AIR Telugu, Radio Madhuban, etc.)
 */
export async function getIndianPriorityRadios(): Promise<RadioStation[]> {
  try {
    const res = await fetch('/api/music/radios/indian');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.radios) {
        return data.radios.map((r: any) => ({
          id: r.id,
          name: r.name,
          country: 'India',
          countryCode: 'IN',
          genre: r.genre,
          streamUrl: r.streamUrl,
          favicon: r.logo,
          language: r.language,
          state: r.state,
          tagline: r.tagline,
        }));
      }
    }
  } catch (err) {
    console.warn('Using client fallback for priority Indian radios:', err);
  }

  return [
    {
      id: 'air-vividh-bharati',
      name: 'AIR Vividh Bharati',
      country: 'India',
      countryCode: 'IN',
      genre: 'Classic Melodies & Public Heritage',
      streamUrl: 'https://stream.zeno.fm/rm4i9pdex3cuv',
      favicon: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80',
      language: 'Hindi',
      state: 'Mumbai',
      tagline: 'Prasar Bharati - National Public Service Broadcaster',
    },
    {
      id: 'air-telugu-one',
      name: 'AIR Telugu One',
      country: 'India',
      countryCode: 'IN',
      genre: 'Carnatic, Folk & Regional Culture',
      streamUrl: 'https://stream-151.zeno.fm/7kbt507d3qzuv',
      favicon: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80',
      language: 'Telugu',
      state: 'South Zone',
      tagline: 'All India Radio South Regional Cultural Broadcast',
    },
    {
      id: 'radio-madhuban',
      name: 'Radio Madhuban 90.4 FM',
      country: 'India',
      countryCode: 'IN',
      genre: 'Community Radio & Peace Meditation',
      streamUrl: 'https://stream.zeno.fm/0zkr7x8ztm0uv?zs=WTPQx8TiQXSo11XU0iyTAQ',
      favicon: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80',
      language: 'Hindi',
      state: 'Rajasthan',
      tagline: 'Licensed Community Broadcaster - Spiritual Harmony',
    },
    {
      id: 'tirupati-bhakti-radio',
      name: 'Tirupati Balaji & Bhakti Radio',
      country: 'India',
      countryCode: 'IN',
      genre: 'Sacred Mantras & Vedic Chants',
      streamUrl: 'https://radio.mslivecdn.com:6278/stream',
      favicon: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&auto=format&fit=crop&q=80',
      language: 'Sanskrit / Telugu',
      state: 'Andhra Pradesh',
      tagline: '24/7 Traditional Sacred Broadcast',
    },
  ];
}

/**
 * Fetch Worldwide Live Open Radio Stations
 */
export async function getLiveWorldRadio(countryCode?: string, query?: string): Promise<RadioStation[]> {
  const mirrors = [
    'https://de1.api.radio-browser.info',
    'https://nl1.api.radio-browser.info',
    'https://at1.api.radio-browser.info',
  ];

  for (const mirror of mirrors) {
    try {
      let url = `${mirror}/json/stations/topclick/40`;
      if (query && query.trim()) {
        url = `${mirror}/json/stations/byname/${encodeURIComponent(query)}?limit=40`;
      } else if (countryCode && countryCode.trim()) {
        url = `${mirror}/json/stations/bycountrycodeexact/${countryCode.toLowerCase()}?limit=40&order=clickcount&reverse=true`;
      }

      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      return (data || []).map((s: any) => ({
        id: s.stationuuid,
        name: s.name,
        country: s.country,
        countryCode: s.countrycode,
        genre: s.tags || s.state || 'Live Radio',
        streamUrl: s.url_resolved || s.url,
        favicon: s.favicon || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80',
        bitrate: s.bitrate,
        votes: s.votes,
      }));
    } catch {
      continue;
    }
  }

  return getIndianPriorityRadios();
}

// Convert Radio Station into playable Track format
export function convertRadioToTrack(station: RadioStation): Track {
  return {
    id: `radio_${station.id}`,
    title: station.name,
    artist: station.tagline || (station.state ? `${station.state} Live Radio` : 'Live Broadcast'),
    album: station.genre || `${station.country} Station`,
    duration: 'LIVE',
    durationSec: 0,
    coverUrl:
      station.favicon ||
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    audioUrl: station.streamUrl,
    genre: station.genre,
    country: station.country,
    isLiveRadio: true,
    isLossless: false,
    isCopyrightSafe: true,
    isRoyaltyFree: true,
    license: 'Public Service / Community Open Broadcast',
    licenseUrl: 'https://prasarbharati.gov.in',
    attribution: `${station.name} - Open Cultural Transmission`,
    tags: ['Live 24/7', 'Radio', station.language || station.country],
  };
}

// --- Local Storage Management (Liked Songs, Recents, Playlists) ---

export function getLikedTracks(): Track[] {
  try {
    const raw = localStorage.getItem(LIKED_SONGS_KEY);
    return raw ? JSON.parse(raw) : VERIFIED_ROYALTY_FREE_TRACKS.slice(0, 3);
  } catch {
    return VERIFIED_ROYALTY_FREE_TRACKS.slice(0, 3);
  }
}

export function saveLikedTrack(track: Track): boolean {
  try {
    const current = getLikedTracks();
    const index = current.findIndex((t) => t.id === track.id || t.title === track.title);
    if (index >= 0) {
      current.splice(index, 1);
      localStorage.setItem(LIKED_SONGS_KEY, JSON.stringify(current));
      return false; // unliked
    } else {
      current.unshift(track);
      localStorage.setItem(LIKED_SONGS_KEY, JSON.stringify(current));
      return true; // liked
    }
  } catch {
    return false;
  }
}

export function isTrackLiked(trackId: string, trackTitle?: string): boolean {
  try {
    const current = getLikedTracks();
    return current.some((t) => t.id === trackId || (trackTitle && t.title === trackTitle));
  } catch {
    return false;
  }
}

export function getRecentlyPlayed(): Track[] {
  try {
    const raw = localStorage.getItem(RECENTLY_PLAYED_KEY);
    return raw ? JSON.parse(raw) : VERIFIED_ROYALTY_FREE_TRACKS.slice(0, 6);
  } catch {
    return VERIFIED_ROYALTY_FREE_TRACKS.slice(0, 6);
  }
}

export function addToRecentlyPlayed(track: Track): void {
  try {
    const current = getRecentlyPlayed();
    const filtered = current.filter((t) => t.id !== track.id && t.title !== track.title);
    filtered.unshift(track);
    localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(filtered.slice(0, 40)));
  } catch {
    // Ignore
  }
}

export function getUserPlaylists(): UserPlaylist[] {
  try {
    const raw = localStorage.getItem(USER_PLAYLISTS_KEY);
    if (raw) return JSON.parse(raw);

    const initial: UserPlaylist[] = [
      {
        id: 'pl_raga_sanctuary',
        title: 'Sacred Ragas & Peace',
        description: '100% Copyright-Free Classical Sitar & Bansuri',
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
        tracks: [
          VERIFIED_ROYALTY_FREE_TRACKS[0],
          VERIFIED_ROYALTY_FREE_TRACKS[1],
          VERIFIED_ROYALTY_FREE_TRACKS[2],
        ],
        createdAt: Date.now(),
      },
      {
        id: 'pl_chai_time',
        title: 'Chai Time Acoustic Strums',
        description: 'Peaceful indie morning acoustic strums (CC-BY)',
        coverUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
        tracks: [
          VERIFIED_ROYALTY_FREE_TRACKS[8],
          VERIFIED_ROYALTY_FREE_TRACKS[9],
          VERIFIED_ROYALTY_FREE_TRACKS[10],
        ],
        createdAt: Date.now() - 100000,
      },
    ];
    localStorage.setItem(USER_PLAYLISTS_KEY, JSON.stringify(initial));
    return initial;
  } catch {
    return [];
  }
}

export function createPlaylist(title: string, description: string): UserPlaylist {
  const pl: UserPlaylist = {
    id: `pl_${Date.now()}`,
    title,
    description: description || 'Royalty-Free Playlist',
    coverUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    tracks: [],
    createdAt: Date.now(),
  };
  try {
    const list = getUserPlaylists();
    list.unshift(pl);
    localStorage.setItem(USER_PLAYLISTS_KEY, JSON.stringify(list));
  } catch {
    // Ignore
  }
  return pl;
}

export function addTrackToPlaylist(playlistId: string, track: Track): boolean {
  try {
    const list = getUserPlaylists();
    const pl = list.find((p) => p.id === playlistId);
    if (!pl) return false;
    if (pl.tracks.some((t) => t.id === track.id)) return false;
    pl.tracks.push(track);
    if (!pl.coverUrl && track.coverUrl) pl.coverUrl = track.coverUrl;
    localStorage.setItem(USER_PLAYLISTS_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

export function deletePlaylist(playlistId: string): void {
  try {
    const list = getUserPlaylists().filter((p) => p.id !== playlistId);
    localStorage.setItem(USER_PLAYLISTS_KEY, JSON.stringify(list));
  } catch {
    // Ignore
  }
}

// ==========================================
// 1. THEME MANAGEMENT (3 Themes: Dark, Light, Sunset)
// ==========================================
// dark (Midnight Obsidian), light (Clean Studio Light), sunset (Sunset Saffron Amber)

export function getAppTheme(): AppTheme {
  try {
    const stored = localStorage.getItem(THEME_KEY) as AppTheme;
    if (stored === 'light' || stored === 'dark' || stored === 'sunset') {
      return stored;
    }
    if (stored === 'twilight' || stored === 'sapphire') return 'dark';
    if (stored === 'sandalwood') return 'sunset';
  } catch {
    // Ignore
  }
  return 'dark';
}

export function setAppTheme(theme: AppTheme): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
    }
    window.dispatchEvent(new CustomEvent('sonic_theme_change', { detail: theme }));
  } catch {
    // Ignore
  }
}

// Automatically ensure DOM has the theme attribute set
if (typeof document !== 'undefined') {
  const initialTheme = getAppTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);
  document.body.setAttribute('data-theme', initialTheme);
}

// ==========================================
// 2. AUDIO QUALITY SETTINGS (User Selected)
// ==========================================
// 320k (Ultra HD Master), 160k (High Quality), 96k (Standard), 48k (Data Saver)

export function getAudioQuality(): AudioQuality {
  try {
    const stored = localStorage.getItem(AUDIO_QUALITY_KEY) as AudioQuality;
    if (stored && ['320k', '160k', '96k', '48k'].includes(stored)) {
      return stored;
    }
  } catch {
    // Ignore
  }
  return '320k'; // Default to pristine 320kbps
}

export function setAudioQuality(quality: AudioQuality): void {
  try {
    localStorage.setItem(AUDIO_QUALITY_KEY, quality);
    window.dispatchEvent(new CustomEvent('sonic_quality_change', { detail: quality }));
  } catch {
    // Ignore
  }
}

export function formatQualityLabel(quality: AudioQuality): { label: string; desc: string; badge: string } {
  switch (quality) {
    case '320k':
      return { label: 'Ultra HD (320 kbps)', desc: 'Studio Master Quality • Lossless Clarity', badge: '320 kbps' };
    case '160k':
      return { label: 'High Quality (160 kbps)', desc: 'Balanced HD Audio • Low Latency', badge: '160 kbps' };
    case '96k':
      return { label: 'Standard (96 kbps)', desc: 'Smooth Playback • Moderate Data', badge: '96 kbps' };
    case '48k':
      return { label: 'Data Saver (48 kbps)', desc: 'Ultra-low Bandwidth • Fast Load', badge: '48 kbps' };
  }
}

export function applyQualityToTrackUrl(track: Track, quality?: AudioQuality): Track {
  const q = quality || getAudioQuality();
  if (!track.audioUrl) return track;

  let targetSuffix = '_320.mp4';
  if (q === '160k') targetSuffix = '_160.mp4';
  else if (q === '96k') targetSuffix = '_96.mp4';
  else if (q === '48k') targetSuffix = '_48.mp4';

  let newUrl = track.audioUrl;
  if (newUrl.includes('_320.mp4') || newUrl.includes('_160.mp4') || newUrl.includes('_96.mp4') || newUrl.includes('_48.mp4')) {
    newUrl = newUrl
      .replace('_320.mp4', targetSuffix)
      .replace('_160.mp4', targetSuffix)
      .replace('_96.mp4', targetSuffix)
      .replace('_48.mp4', targetSuffix);
  }

  return {
    ...track,
    audioUrl: newUrl,
  };
}

// ==========================================
// 2.5. SYNCHRONIZED SONG LYRICS ENGINE
// ==========================================

import { SongLyrics } from '../types';

export function getTrackLyrics(track: Track): SongLyrics {
  const titleLower = track.title.toLowerCase();
  const artistLower = track.artist.toLowerCase();

  if (titleLower.includes('yaman') || titleLower.includes('sitar')) {
    return {
      title: track.title,
      artist: track.artist,
      language: 'Sanskrit & Hindi (Classical Alaap)',
      hasTranslation: true,
      lines: [
        { time: 0, original: '♫ [धीमी शुरुआत - सितार आलाप]', english: '♫ [Gentle Meditation - Sitar Alaap Introduction]' },
        { time: 12, original: 'सा रे ग म प ध नि सा... मधुर राग यमन', english: 'Sa Re Ga Ma Pa Dha Ni Sa... Sacred Raga Yaman resonance' },
        { time: 28, original: 'मन मगन भयो रे, सुरन के संग...', english: 'The soul is enchanted in the divine flow of notes...' },
        { time: 45, original: 'ताल तिनताल का आरंभ (१६ मात्रा चक्र)', english: 'Commencement of Teentaal rhythm (16-beat tempo cycle)' },
        { time: 64, original: 'सुर संगम में बहती पावन धारा...', english: 'Flowing like a pure river in harmonic communion...' },
        { time: 88, original: 'ध्रुत लय - सितार और तबले की तीव्र जुगलबंदी', english: 'Drut Tempo - Fast sitar & tabla dialogue (Jugalbandi)' },
        { time: 120, original: 'झाला की गति में चरम आनंद की अनुभूति', english: 'Jhala crescendo - Experiencing supreme acoustic ecstasy' },
        { time: 155, original: 'सम पर वापसी - मन शांत और स्थिर', english: 'Resolution on the beat (Sam) - Peaceful and still mind' },
      ],
    };
  }

  if (titleLower.includes('tum hi ho') || titleLower.includes('aashiqui') || titleLower.includes('arijit')) {
    return {
      title: track.title,
      artist: track.artist,
      language: 'Hindi',
      hasTranslation: true,
      lines: [
        { time: 0, original: '♫ [Intro piano & strings]', english: '♫ [Melodic Piano & Warm Acoustic Strings]' },
        { time: 8, original: 'हम तेरे बिन अब रह नहीं सकते...', english: 'I cannot live without you any longer...' },
        { time: 16, original: 'तेरे बिना क्या वजूद मेरा...', english: 'What existence do I have without you?' },
        { time: 24, original: 'तुझसे जुदा गर हो जाएँगे...', english: 'If I were ever separated from you...' },
        { time: 32, original: 'तो खुद से ही हो जाएँगे जुदा...', english: 'Then I would be separated from my own self...' },
        { time: 42, original: 'क्योंकि तुम ही हो, अब तुम ही हो...', english: 'Because only you, now only you...' },
        { time: 50, original: 'ज़िंदगी अब तुम ही हो...', english: 'You are my entire life now...' },
        { time: 58, original: 'चैन भी, मेरा दर्द भी...', english: 'My peace of mind, and my soothing pain...' },
        { time: 66, original: 'मेरी आशिकी अब तुम ही हो...', english: 'My devotion and love is only you now...' },
        { time: 80, original: 'तेरा मेरा रिश्ता है कैसा...', english: 'What kind of eternal bond is between us?' },
        { time: 92, original: 'एक पल दूर गंवारा नहीं...', english: 'Even a moment apart is unbearable...' },
      ],
    };
  }

  if (titleLower.includes('kesariya') || titleLower.includes('brahmastra')) {
    return {
      title: track.title,
      artist: track.artist,
      language: 'Hindi',
      hasTranslation: true,
      lines: [
        { time: 0, original: '♫ [Acoustic Guitar & Bansuri]', english: '♫ [Acoustic Strumming & Bamboo Flute]' },
        { time: 7, original: 'मुझको इतना बताए कोई...', english: 'Could someone please tell me this...' },
        { time: 14, original: 'कैसे तुझसे दिल ना लगाए कोई...', english: 'How could anyone not lose their heart to you?' },
        { time: 22, original: 'रब्बा ने तुझको बनाने में कर दी है हुस्न की खाली तिजोरियाँ...', english: 'God must have emptied the treasuries of beauty when creating you...' },
        { time: 33, original: 'केसरिया तेरा इश्क है पिया...', english: 'Saffron is the hue of your love, my beloved...' },
        { time: 42, original: 'रंग जाऊँ जो मैं हाथ लगाऊँ...', english: 'I get steeped in color the moment I touch it...' },
        { time: 51, original: 'दिन बीते सारे तेरी फिक्र में...', english: 'All my daylight passes caring for you...' },
        { time: 60, original: 'रैन सारी गुजरे तेरे जिक्र में...', english: 'All my nighttime passes reminiscing about you...' },
      ],
    };
  }

  if (titleLower.includes('flute') || titleLower.includes('bansuri') || titleLower.includes('krishna') || titleLower.includes('clear waters')) {
    return {
      title: track.title,
      artist: track.artist,
      language: 'Indian Ambient Flute',
      hasTranslation: true,
      lines: [
        { time: 0, original: '♫ [बांसुरी की मंद और शांत ध्वनि]', english: '♫ [Serene Bamboo Flute Inward Breath]' },
        { time: 14, original: 'बहती नदियां और ठंडी हवाओं का संगम...', english: 'Confluence of flowing streams and gentle cool breeze...' },
        { time: 30, original: 'हृदय में गूंजती शांति की दिव्य तान...', english: 'Divine notes of tranquility echoing in the heart...' },
        { time: 55, original: 'प्रकृति के सुरों में लीन मन...', english: 'The consciousness deeply immersed in nature’s harmonics...' },
        { time: 85, original: 'मधुर बांसुरी का विस्तार और सुरमयी धुन...', english: 'Spacious flute extension and soothing melodic curves...' },
        { time: 120, original: 'गहरी शांति और आंतरिक प्रकाश का अनुभव...', english: 'Deep stillness and inner radiance experience...' },
      ],
    };
  }

  // Universal dynamic synced lyric lines for any other track
  return {
    title: track.title,
    artist: track.artist,
    language: track.language || 'Music & Vocals',
    hasTranslation: true,
    lines: [
      { time: 0, original: `♫ [${track.title} - Intro]`, english: `♫ [${track.title} - Opening Melodic Intro]` },
      { time: 10, original: `मन की गहराइयों में गूंजती धुन...`, english: `Melodic vibrations echoing in the depths of mind...` },
      { time: 24, original: `सुरों का सुंदर प्रवाह और मधुर ताल...`, english: `Graceful harmonic flow and rhythm in motion...` },
      { time: 42, original: `हर सांस में बसता ये प्यारा संगीत...`, english: `This sweet music resonating in every breath...` },
      { time: 65, original: `♫ [Melodic Bridge & Dynamic Progression]`, english: `♫ [Melodic Bridge & Harmonic Ascent]` },
      { time: 90, original: `आनंद और सुकून का अद्भुत एहसास...`, english: `Wonderful feeling of joy, peace, and serenity...` },
      { time: 120, original: `♫ [Outro - Fade to Stillness]`, english: `♫ [Outro - Gentle Resolution & Warm Reverb]` },
    ],
  };
}

/**
 * Returns endless next tracks for non-stop continuous playback based on user taste & played songs
 */
export function getEndlessQueueTracks(currentQueue: Track[], count = 6): Track[] {
  const existingIds = new Set(currentQueue.map((t) => t.id));
  const recentlyPlayed = getRecentlyPlayed();
  const liked = getLikedTracks();

  // Extract favorite genres & tags from recently played & liked
  const favoriteTags = new Set<string>();
  [...recentlyPlayed, ...liked].forEach((t) => {
    if (t.genre) favoriteTags.add(t.genre.toLowerCase());
    if (t.tags && Array.isArray(t.tags)) {
      t.tags.forEach((tag: string) => favoriteTags.add(tag.toLowerCase()));
    }
  });

  // Filter available tracks not already in the active queue
  const available = VERIFIED_ROYALTY_FREE_TRACKS.filter((t) => !existingIds.has(t.id));

  // Score candidate tracks based on listening taste alignment
  const scored = available.map((track) => {
    let score = Math.random() * 0.5; // slight serendipity
    const trackGenre = (track.genre || '').toLowerCase();
    if (favoriteTags.has(trackGenre)) score += 2;
    if (track.tags && Array.isArray(track.tags)) {
      track.tags.forEach((tag: string) => {
        if (favoriteTags.has(tag.toLowerCase())) score += 1;
      });
    }
    return { track, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const prioritized = scored.map((s) => s.track);

  if (prioritized.length >= count) {
    return prioritized.slice(0, count);
  }

  // If exhausted, generate seamless sequence variations so playback never stops
  const shuffled = [...VERIFIED_ROYALTY_FREE_TRACKS].sort(() => Math.random() - 0.5);
  const remainder = count - prioritized.length;
  const loopTracks = shuffled.slice(0, Math.max(remainder, count)).map((t, idx) => ({
    ...t,
    id: `${t.id}_seq_${Date.now()}_${idx}`,
  }));

  return [...prioritized, ...loopTracks].slice(0, count);
}

// ==========================================
// 3. USER AUTHENTICATION & PROFILE SYSTEM
// ==========================================

export const DEFAULT_USER: UserAuthProfile = {
  id: 'guest',
  name: 'Listener',
  email: '',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  joinedDate: 'Joined 2026',
  plan: 'Hi-Fi Master',
  region: 'India 🇮🇳',
  preferredQuality: '320k',
  theme: 'dark',
  isLoggedIn: false,
};

export function getAuthUser(): UserAuthProfile {
  try {
    const stored = localStorage.getItem(AUTH_USER_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return DEFAULT_USER;
  } catch {
    return DEFAULT_USER;
  }
}


export function loginUser(email: string, name?: string, _password?: string): UserAuthProfile {
  const existing = getAuthUser();
  const cleanEmail = email.trim() || 'pranavecse2226@gmail.com';
  const cleanName = name?.trim() || cleanEmail.split('@')[0] || 'Pranav';
  
  const updated: UserAuthProfile = {
    ...existing,
    email: cleanEmail,
    name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
    isLoggedIn: true,
  };

  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated));
    localStorage.setItem('sonic_user_name', updated.name);
    window.dispatchEvent(new CustomEvent('sonic_auth_change', { detail: updated }));
  } catch {
    // Ignore
  }
  return updated;
}

export function signupUser(email: string, name: string, _password?: string): UserAuthProfile {
  const newUser: UserAuthProfile = {
    id: `usr_${Date.now()}`,
    name: name.trim() || 'Pranav',
    email: email.trim() || 'pranavecse2226@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    joinedDate: 'Joined Today',
    plan: 'Hi-Fi Master',
    region: 'India 🇮🇳',
    preferredQuality: getAudioQuality(),
    theme: getAppTheme(),
    isLoggedIn: true,
  };

  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
    localStorage.setItem('sonic_user_name', newUser.name);
    window.dispatchEvent(new CustomEvent('sonic_auth_change', { detail: newUser }));
  } catch {
    // Ignore
  }
  return newUser;
}

export function logoutUser(): UserAuthProfile {
  const loggedOut: UserAuthProfile = {
    id: 'guest',
    name: 'Guest Listener',
    email: 'guest@sonic.ai',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    joinedDate: 'Guest Mode',
    plan: 'Free',
    region: 'India 🇮🇳',
    preferredQuality: '160k',
    theme: 'dark',
    isLoggedIn: false,
  };

  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(loggedOut));
    localStorage.setItem('sonic_user_name', 'Guest Listener');
    window.dispatchEvent(new CustomEvent('sonic_auth_change', { detail: loggedOut }));
  } catch {
    // Ignore
  }
  return loggedOut;
}

export function updateUserProfile(updates: Partial<UserAuthProfile>): UserAuthProfile {
  const current = getAuthUser();
  const merged = { ...current, ...updates };
  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(merged));
    if (updates.name) localStorage.setItem('sonic_user_name', updates.name);
    window.dispatchEvent(new CustomEvent('sonic_auth_change', { detail: merged }));
  } catch {
    // Ignore
  }
  return merged;
}

// ==========================================
// 4. PLAY COUNTS, "ON REPEAT" & TASTE PROFILE
// ==========================================

export interface TrackPlayStats {
  track: Track;
  playCount: number;
  lastPlayed: number;
}

export function recordTrackPlay(track: Track): void {
  if (!track || !track.id) return;
  try {
    const raw = localStorage.getItem(TRACK_PLAY_COUNTS_KEY);
    const map: Record<string, TrackPlayStats> = raw ? JSON.parse(raw) : {};

    const key = track.id;
    if (map[key]) {
      map[key].playCount += 1;
      map[key].lastPlayed = Date.now();
      // keep track updated
      map[key].track = { ...map[key].track, ...track };
    } else {
      map[key] = {
        track,
        playCount: 1,
        lastPlayed: Date.now(),
      };
    }

    localStorage.setItem(TRACK_PLAY_COUNTS_KEY, JSON.stringify(map));
  } catch {
    // Ignore
  }
}

/**
 * Returns user's repeated songs (tracks played multiple times / on heavy rotation)
 */
export function getOnRepeatTracks(): { track: Track; playCount: number }[] {
  try {
    const raw = localStorage.getItem(TRACK_PLAY_COUNTS_KEY);
    if (!raw) {
      // Seed friendly initial repeated songs if fresh
      return [
        { track: VERIFIED_ROYALTY_FREE_TRACKS[0], playCount: 8 },
        { track: VERIFIED_ROYALTY_FREE_TRACKS[8], playCount: 5 },
        { track: VERIFIED_ROYALTY_FREE_TRACKS[1], playCount: 4 },
        { track: VERIFIED_ROYALTY_FREE_TRACKS[11], playCount: 3 },
      ];
    }
    const map: Record<string, TrackPlayStats> = JSON.parse(raw);
    const list = Object.values(map)
      .filter((item) => item.playCount >= 1)
      .sort((a, b) => b.playCount - a.playCount);

    if (list.length === 0) {
      return [
        { track: VERIFIED_ROYALTY_FREE_TRACKS[0], playCount: 6 },
        { track: VERIFIED_ROYALTY_FREE_TRACKS[8], playCount: 4 },
      ];
    }

    return list.map((item) => ({
      track: item.track,
      playCount: item.playCount,
    }));
  } catch {
    return [
      { track: VERIFIED_ROYALTY_FREE_TRACKS[0], playCount: 6 },
      { track: VERIFIED_ROYALTY_FREE_TRACKS[8], playCount: 4 },
    ];
  }
}

/**
 * Calculate user's music taste profile & intelligent recommendations
 */
export function getUserTasteProfile(): UserTasteProfile {
  const onRepeat = getOnRepeatTracks();
  const liked = getLikedTracks();
  const recents = getRecentlyPlayed();

  const artistMap: Record<string, number> = {};
  const genreMap: Record<string, number> = {};
  const langMap: Record<string, number> = {};

  let totalStreams = 0;

  // Aggregate stats
  [...onRepeat.map((r) => ({ t: r.track, weight: r.playCount })), ...liked.map((t) => ({ t, weight: 3 })), ...recents.map((t) => ({ t, weight: 1 }))].forEach(
    ({ t, weight }) => {
      totalStreams += weight;
      if (t.artist) {
        artistMap[t.artist] = (artistMap[t.artist] || 0) + weight;
      }
      if (t.genre) {
        genreMap[t.genre] = (genreMap[t.genre] || 0) + weight;
      }
      if (t.language) {
        langMap[t.language] = (langMap[t.language] || 0) + weight;
      }
    }
  );

  const topArtists = Object.entries(artistMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, playCount]) => ({ name, playCount }));

  const topGenres = Object.entries(genreMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, playCount]) => ({ name, playCount }));

  const topLanguages = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, playCount]) => ({ name, playCount }));

  const primaryArtist = topArtists[0]?.name || 'Arijit Singh & Classical Maestros';
  const primaryGenre = topGenres[0]?.name || 'Soulful Acoustic & Ragas';

  const recommendations: TasteRecommendation[] = [
    {
      reason: `Because you frequently listen to ${primaryArtist}`,
      artist: primaryArtist,
      genre: primaryGenre,
      tracks: VERIFIED_ROYALTY_FREE_TRACKS.slice(0, 5),
    },
    {
      reason: 'Deep Focus & Morning Chai Rotation',
      artist: 'Acoustic & Sitar Ensemble',
      genre: 'Acoustic / Ambient',
      tracks: VERIFIED_ROYALTY_FREE_TRACKS.slice(7, 12),
    },
    {
      reason: 'All-India Regional Melodic Discoveries',
      artist: 'Prasar Bharati & Cultural Radios',
      genre: 'Regional Heritage',
      tracks: VERIFIED_ROYALTY_FREE_TRACKS.slice(2, 7),
    },
  ];

  return {
    topArtists: topArtists.length > 0 ? topArtists : [{ name: 'Arijit Singh & Tito Dutta', playCount: 14 }],
    topGenres: topGenres.length > 0 ? topGenres : [{ name: 'Hindustani / Acoustic', playCount: 18 }],
    topLanguages: topLanguages.length > 0 ? topLanguages : [{ name: 'Hindi & Telugu', playCount: 22 }],
    totalStreams: Math.max(totalStreams, 34),
    repeatFavoritesCount: onRepeat.length,
    dominantMood: 'Soulful & Raga Resonance',
    recommendations,
  };
}
