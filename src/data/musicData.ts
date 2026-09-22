import { Track, SmartPlaylist, UserProfile } from '../types';

export const SONIC_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1WvbJXVTSgVkSn_a5d3mOb0ZXERLTbI8jUgCi9xIiSKQWNUQs2Kqe9NX9jrwMA6Tho_slhXXcuG3CBAjXq5yhfdXX6xamHPeJv1qZZA9pLTWm0D4bwZ2DmrQCK4sEj76ALoKt2biU9sagxaaSGRieM74yPanqSBk7N3hdxo5WeT8DC-QlYoDc7JcIdc2nqNGNVrY-CX7JAGUa2B9we40FOTBkuKCK9bXbNxLbGVamT8LWgK80MuA_sq5ipH';

export const ELENA_AVATAR_LARGE =
  'https://lh3.googleusercontent.com/aida/AEtjO1VPxD_LWEbpw2F-6mm3SMdJH44f0Jp1MeVJQK4oeT2LYpZvnftWXfpoVXFHJXqXWyJV50mOYhpfghky07A8XPpcMb1SLcQWqzCabqhBBZYnS5mh-4JJ4rH5AEIgq5Uctm60ZLwYwLvdOuQltTEPzX2P94uynJfWU8l8rHxA99fWa25G-1MyR4QzIEDYGImx9oyMOxftr8uTWHjLtD0cC4e2uc1KRgd8QJbqLqpNkL8o5ksv-7xSLRsvZ6Fx';

export const ELENA_AVATAR_SMALL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBKrBN_LnXSfopwbdmHtLYDuH2eFw5lFqht3wTlagUPATX8mWcxwWqBeWOomFV6BltgZbc8XUg652_zucgH9eD5NQTG7bOyYqzi6R55Y7w9XuBaciCnZ2hu5ocUURQKA_Hs3UgWiqBTs_e8-H7Wu0V0abS8ALXm_sxvCDKNJMmAPJfWKW7zsUdG1xq70K10Xe31ahqkMPfRVB2i634rvvUqI8q6FVGmTS7F3yr8hjrV7h9yTg5x-7aoHg';

export const DEFAULT_TRACK: Track = {
  id: 'cc_raga_yaman_sitar',
  title: 'Raga Yaman (Sitar Recital)',
  artist: 'Tito Dutta',
  album: 'Hindustani Classical Heritage',
  duration: '04:12',
  durationSec: 252,
  coverUrl:
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
  previewUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Sitar_sample_yaman.ogg',
  audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Sitar_sample_yaman.ogg',
  genre: 'Hindustani Classical',
  country: 'India',
  language: 'Instrumental',
  license: 'Creative Commons (CC BY-SA 3.0)',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  attribution: 'Performance by Tito Dutta, Wikimedia Commons',
  isCopyrightSafe: true,
  isRoyaltyFree: true,
  isLossless: true,
  isFullSong: true,
  tags: ['Sitar', 'Raga Yaman', 'Indian Classical', 'Evening Raga'],
  bpm: 72,
  affinityNote: 'Hindustani Classical Master • Evening Raga Yaman',
};

export const DEFAULT_NOW_PLAYING_TRACK = DEFAULT_TRACK;

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Elena Vance',
  handle: '@elenavance',
  title: 'RezBeatsAI DNA Explorer • Hi-Fi Spatial',
  bio: 'Architect by day, ambient soundscape collector by night. Powered by generative acoustic models.',
  avatarUrl: ELENA_AVATAR_LARGE,
  stats: {
    minutes: '14.8k',
    tracks: '1,420',
    discovered: '284',
    streakDays: 28,
  },
  archetype: {
    name: 'Night Explorer',
    description:
      'You discover 74% of your new favorite tracks between 11 PM and 3 AM, leaning into atmospheric textures, warm acoustic resonance, and modular synthesis.',
    curiosityScore: 78,
    curiosityPercentile: 'Top 2%',
    curiosityNote:
      'High openness to novel harmonics outside your primary genre cluster.',
  },
  signature: {
    neoClassical: 38,
    downtempo: 26,
    atmospheric: 21,
    melodicTechno: 15,
  },
  tasteEvolution: {
    warmth: '+43%',
    density: '-18%',
    avgTempo: 64,
  },
  settings: {
    neuralEngineActive: true,
    spatialAudio: 'Lossless (24-bit / 96kHz)',
    aiDjAutopilot: true,
    connectedHardware: 'Sony WH-1000XM5',
  },
};

export const ELENA_PROFILE = {
  ...INITIAL_USER_PROFILE,
  avatar: ELENA_AVATAR_LARGE,
  joined: 'Joined Sept 2026',
  level: 'Audiophile Level 4',
};

export const MADE_FOR_YOU_ITEMS = [
  {
    id: 'daily-01',
    title: 'Daily Mix 01',
    subtitle: 'Floating in Reverb',
    genre: 'Ambient · Chillwave',
    badge: 'Daily 01',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDP94YgZVLv2yRbjv9VefZYL90Bn2gNfGAehiamoRfyRl-FhGmytLSRID9cxW9QYJOCmX50u6w8iBYKz7ZLLRiA7mvQUZWTMtCyB3R9I0W_wnWX5LWhb2MyGpwCb2iVZKXGfPT7OY5gHteG-UqLO4Md3WJuCbZShTyGZrIRjSs-1w8cwwZ117VKIaTS_NoogAPAsJ6LA_1CeScA804sVIbwggu4W5BiM3UegKXXBblgG7g-5XK4iewiUg',
  },
  {
    id: 'late-night-focus',
    title: 'Late Night Focus',
    subtitle: 'Deep Binaural Beats',
    genre: 'Synth · Frequency',
    badge: 'Deep Focus',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBljuQ7doGPribSPe1z0zKfTcP3h9km_w5K8W1OcneOgCq3yS0_676RBlbQ0unAv7Twdn5elrcVV6GDS-NtBqZFTNIdVIyItAVOPEaJd3hM355jVJRA1-BH0NbnLbaTxOGRbAMJBP4y7J8rDHPyb8TrpXT6Hp2jnPPgQQz_Ru_OaQMBDX8qTwd_3wZ6627w9hoI39m9xd9kgk1Kzu6QaAbjJ6qxe9AjavirR6tKHDlwP5EefbveUOAsZg',
  },
  {
    id: 'morning-energy',
    title: 'Morning Energy',
    subtitle: 'Neo-Soul & Nuance',
    genre: 'Electric Grooves',
    badge: 'Vitality',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9SrT1-SII2aZG9BfS6OO2szZgWPTUGK_PoOsYHyZHEOmNlFYltkRLYfxvinf6tqhSUK91gR0LF43455WFgRqoRqhufexzoCM-I4K8GCUxQAqaGo9v2H-QNEmWXLkkXcQu5kXuHwFC2Z-SLIw4nZo7RZiM1zYHviDqRAPaEZDcbw6Oj39TkUUwavyHoPRFbrMUGGEw690y2ry9djODsHfEbYVASg_YB3a5JtK5tNizF2jzxakhUQoxAw',
  },
  {
    id: 'discovery-mix',
    title: 'Discovery Mix',
    subtitle: 'Unexplored Gems',
    genre: 'Algorithmic Match',
    badge: 'Radar',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZUfZPANdQHGFEMBPGczHsdy6-Mx9VgiEs1eJH6zowXZ_qSyi4d8Jbvvj7XAr2zZ0N8vFSAmF8o4mJe9pM6ifiGAK5Zd2cL8tjHBLaCv-KTYoHySkszy2R-e0JkslKNcSg5eJ4eFd-uKk55sooeacyqQrbi0QeIXmMjQyitkQ1f5THn9gS_8LGH-NX_xExS2bZqoqHZu3RChsXJn8cgUgACB9WrBIyTtbN1tF0DBZfMgZT4ImxnpzxYA',
  },
];

export const CONTINUE_LISTENING_TRACKS: Track[] = [
  {
    id: 'solar-drift',
    title: 'Solar Drift',
    artist: 'Tycho',
    duration: '04:45',
    progressPercent: 72,
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzA0NFYdeuD0H2kzHMfRpaWgD3jI31JLH9V5AOohQkooT3LvXUnpwAzqWZPxTYMtqBfNw_PXZfon-tbi6W3VF7P-cWbNvs6XC_XjrA8WPY8_Quz22vMBEghby38_dR5NlD9-69IaiKXTjfvp8BllgFelu3SwMFMdKVXJlS4nC143_eq3QtyKDGZJjtkKaWNifz3bj1Ad3bOX2PawTMPk2ALWwutJy0xW5Wh0A5C7dIBnF4Cve5GbN7MQ',
  },
  {
    id: 'reflections',
    title: 'Reflections',
    artist: 'Nils Frahm',
    duration: '05:12',
    progressPercent: 34,
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCuGqhvC1ftYYaQ4Q1TicnboRPV4sKN70OXNyZLkgzNhMrbpAguk83NZdZ_f78Syr-zJbbyczX9WdzynPYSyIvlzLunEZGDm9xG4LaQIB4PkcDWtxkStPMtEO6Uw57SPDDT5gpjc5CXy524ndcBky0uzJZ_yRxQTxHlxTMqsLSCd_BcTtn7FvJKV7Y4VCqIwOcN5aBG9VcrOVFlaSR6Mcmd75inaR7QjfqKgR8U_O5GX9QUVzoF49GVTA',
  },
  {
    id: 'night-bloom',
    title: 'Night Bloom',
    artist: 'Bonobo',
    duration: '03:40',
    progressPercent: 90,
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAawgRjqNtXIxFZmZ8RTKP8FN3aGirlia0K-sFhS_n1OQ2u7-upRh4YOrf_bLGwUVEuWY9CWBJxRnNtyvNuQgIuAfEHUr5RGm85xOc2XsOgrvD8kOdkApsqAKg7msjoTcaSehSHOiLGdOfRV55lyeajxTQwzDyhAjknDdIg-Q1YE3o4MCxGDbx8-18_K7SN7_9wNF8OGsm7ARD2I2zzIPaAxKAhP8LQv6tdn1C4HO67_wcXU3LqbXv3mQ',
  },
];

export const ACOUSTIC_INDIE_RECOMMENDATIONS: Track[] = [
  {
    id: 'holocene-whispers',
    title: 'Holocene Whispers',
    artist: 'Sufjan & Novo Amor',
    duration: '04:18',
    matchScore: 98,
    tags: ['Fingerstyle', 'Warm'],
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCxXARUxylCTR8B_sHcnAhrLkZdcfrdepTB4_5x69z5qWw9dTrTlPrZINARYsR9dlw3K8GUAi-AYFQTVungG1hmz5sXNAu6yyJWBSsz4wPbWqnU0bUGjGjY5_Ab1OwrsRWTo22s4FEOEv1q8vusa9Fg7Cy1JDWOGiSBPAu8U94PjuBYj07KllN_dXW-N6QNEWP0AyftaWy3KztR1hZI87_ciUdElaSruesqAp0mnmB3mNY9q-QzjW0Bg',
  },
  {
    id: 'canyon-pines',
    title: 'Canyon Pines',
    artist: 'Iron & Wine (Sonic Edit)',
    duration: '03:52',
    matchScore: 95,
    tags: ['Muted Percussion'],
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA3lHCaFZPm07EJSoouJT0uoPoJhUBlowRm5QwQqEsvWUbZjhqfAyjR-nGSfhkVyN-YtUEn7W0w-YD2BS83utSalM33EqZcXr92Y9u1tIQqnmYV3jN4RhXV4yk-HZdCPUry20xuk5NLWdhPqFAqPTAIWFgmezWjaC41hjTMQgs7QBEZVtKFYbYGs3DzZ6wCKtVUxJM05q8yGmwNKhHbt0Z1bbzyCDGxVUIbICtSzpQypMst_kgQiVffjw',
  },
  {
    id: 'vapour-in-the-hall',
    title: 'Vapour in the Hall',
    artist: 'The Tallest Man on Earth',
    duration: '04:05',
    matchScore: 92,
    tags: ['Open Tuning', 'Live'],
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuALFgMqsSPz5o7kbVC_DMjztJkzLbl3y3FSCtSkNypK58WuTxCxqMAHlGM3NUUj41ECC4Dj1DLm6Jxu0JS_HLD2_clkLlcKcSQY7JS4kp_W0jB5TRXnG4kgHl9XvWscNPRZN4WiY0bcsXzkY5PAHKGKfKexe5337ufcT0KphRx_4VBysxMXg5GhMTvtG0mhVNDZlgEYUcTbVJ1d7B8dT8dUZIIAw0L0LyLqZt7VCCO3zQwhVDrnRfuEvw',
  },
];

export const SMART_PLAYLISTS: SmartPlaylist[] = [
  {
    id: 'liked-songs',
    title: 'Liked Songs',
    subtitle: '348 songs • Continuously tuned',
    trackCount: 348,
    type: 'live',
    isLive: true,
  },
  {
    id: 'night-drive',
    title: 'Night Drive',
    subtitle: '42 songs • Smart Energy Balanced',
    badge: '124 BPM avg',
    trackCount: 42,
    type: 'curated',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ4jyJ-JuJk6bZD5uc2l9uc-nYZeyTWGFDR4FQv-F3TaExcXQWrYW9DoKAbNl-lqb8aG-mHoZvFqcYcj2Kxju1x1jeUIsXOdU0h6Ea0BfADtqqOM1gPE7Tk6vJu0VEfvncNEH0lJdhCt6iap6ZfrTimaockoknIkWobwJMN_WhUv_9NXYX67n34ka4j9dvFSGGSkcsAFWnA41B8XBuPzV9Pw4pVx91-dYFwQaLQfb8mJ8pl5qgt73-nQ',
  },
  {
    id: 'deep-focus-lab',
    title: 'Deep Focus Lab',
    subtitle: '56 songs • Binaural & Ambient',
    badge: '40 Hz Alpha',
    trackCount: 56,
    type: 'binaural',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAb7Zqb0EOVoB2SM_5K4Hk5MN_LQJzwKKUsjhatVbGF6diS4r-UqJTvKZVvmWXdywE_IXM5SF3Ng8Gs9sXylNss5J25KqUTEy37tssAuoJg1P9mQEYNnbNyxy_QWvRwL_zARW4t4QfCp1MJyJh_iauWRGREwsskGD_nhlnzGAYE1NLy-obChwCqvPLVxqA-KCzlcM5u3ZI4-BVr2ZWihLxky2dakW3ckq-YJU5t2AJm0OjxuiyRUqvzUw',
  },
  {
    id: 'acoustic-journeys',
    title: 'Acoustic Journeys',
    subtitle: '28 songs • 88% Acoustic affinity',
    badge: 'Raw Audio',
    trackCount: 28,
    type: 'acoustic',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDp32Cf6zvaT6EwYbalCG3UTt7iooQNlDfGxm9shywCvz8VYW7TGwEdu8qA3GnlIXKUg8hKf_ZLQUsYrJ7pMetqhDRlQi9tuUxGKuRuEJK2laWky46JbZZ1AVfnRTxpwrBanWeRyRKMQcyVYm9z8Pz5FhUhAp7EpHwCe_1h86LiYJ19kGiYtnM8cpTtWXV5m4hC9jCoM56T595qPIlquan5PShLD9QxCGJUqVcxjJWY5Js0QcMz9CBE5Q',
  },
];

export const RECENTLY_ADDED_COLLECTION: Track[] = [
  {
    id: 'weekend-ambient',
    title: 'Weekend Ambient Drift',
    artist: 'Playlist • 34 songs • Smart Adaptive',
    duration: '2h 14m',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8jBMHuzoRBlpZ8Z8E9F_Z75HRF2-B-KdRdbsMGU05RVVziRj8pp_8z6ZiRTAS3pR6-fofSCBVGJZesq4wCQGG29P7gAC8I4dR7zbX_hYwwpOcXEBA8sLfSKfw-Ml7HD8DcJD7T9VMtAejrtbIYehyUquMyhMONTtdNdhP9xuwxFn8os5MLti0unVtvSboPTQ20mtU55LNXsCR3qWanfCSsSvmnEfu0EqWvSEufQ7UdDHRrDxBli0kOQ',
  },
  {
    id: 'neo-classical-horizons',
    title: 'Neo-Classical Horizons',
    artist: 'Album • Nils Frahm, Hania Rani, Ólafur Arnalds',
    duration: '52m',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA701Ym0ssEQPQ_02lv_RQlcDAS4g5_ko9vz6GeyG_83t5_vCotPzgMsL3bNyR9JxoIssGOIvjRqYTs8C_YCOti4syPddst28S5_opArK2yqZVPTE6vaZVSU_m4hE2-p1DzXL8PXJa6sA0czp0qTlrlpiVT7uMzzIbDftyT16J3RTLYEQ29y_pvSRqlot_BjWKVwt8yMD53qFr_rqFCm3YkaNBExJ0JAcyGdLReQ1l4MAJyiZrGOXAcKA',
  },
  {
    id: 'subsurface-velocity',
    title: 'Subsurface Velocity EP',
    artist: 'EP • Echo Grid • 4 tracks',
    duration: '18m',
    isLossless: true,
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB4pp7iI035-UrZ1dNK5bR4J1abtKy6byaLJ7WD1JHXIdx4YtjesoG31eJhwSMlkK5yF_KGIb97XA__3Ec5j5maIqEy9LEcAOHRoJcHWTF3wFfhxJsk6FfYzyxqxlSrIb3CrY6jUNOHyyGyBvi5hkvsN4In9px2UnHT8nOWs-47fewntoOIKpeWjfe_R281yo9b0DgcFfThkKdpyYeZf8tG_YzhFWAr0OJ3iOl8FYOJ2jRW8pzjjjKDLg',
  },
  {
    id: 'study-session-14',
    title: 'Study Session #14',
    artist: 'Curated Session • 58 min • 99% match',
    duration: '58m',
    tags: ['Flow State'],
    coverUrl: '', // uses graphic_eq icon
  },
  {
    id: 'solar-echoes-album',
    title: 'Solar Echoes',
    artist: 'Album • Tycho • Downloaded',
    duration: '46m',
    isDownloaded: true,
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLQDlBoK1kJQO8PIldl_OW00AdSFTnxF9cYJBbQzqiMQ0YI3Mju3f4uKiBSHjF_YEv3s7A2XuIR4tlTAtTaC5hce6jT4hXHEhy6ptwI4ki-_pa1UlqUrP0e2uRzavRh0UnRm97xdk63g9SslVLqBcRKWZ1WJDCbpdNU1qlCoOFdj_siVT0d4htAZXaSZqu4StOOcQkDyN5CAdwoa6p8ThMXspemfN5P5PtgNzVydlF-B30Z121s3CyCw',
  },
];

export const HIDDEN_GEMS = [
  {
    id: 'liana-woods',
    name: 'Liana Woods',
    genre: 'Atmospheric Alt-Folk',
    affinity: '96% Affinity',
    listeners: '31.4k monthly listeners',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCxXARUxylCTR8B_sHcnAhrLkZdcfrdepTB4_5x69z5qWw9dTrTlPrZINARYsR9dlw3K8GUAi-AYFQTVungG1hmz5sXNAu6yyJWBSsz4wPbWqnU0bUGjGjY5_Ab1OwrsRWTo22s4FEOEv1q8vusa9Fg7Cy1JDWOGiSBPAu8U94PjuBYj07KllN_dXW-N6QNEWP0AyftaWy3KztR1hZI87_ciUdElaSruesqAp0mnmB3mNY9q-QzjW0Bg',
  },
  {
    id: 'komorebi-lab',
    name: 'Komorebi Sound Lab',
    genre: 'Modular Ambient · Tokyo',
    affinity: '94% Affinity',
    listeners: '18.2k monthly listeners',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB4pp7iI035-UrZ1dNK5bR4J1abtKy6byaLJ7WD1JHXIdx4YtjesoG31eJhwSMlkK5yF_KGIb97XA__3Ec5j5maIqEy9LEcAOHRoJcHWTF3wFfhxJsk6FfYzyxqxlSrIb3CrY6jUNOHyyGyBvi5hkvsN4In9px2UnHT8nOWs-47fewntoOIKpeWjfe_R281yo9b0DgcFfThkKdpyYeZf8tG_YzhFWAr0OJ3iOl8FYOJ2jRW8pzjjjKDLg',
  },
  {
    id: 'vanta-waves',
    name: 'Vanta Waves',
    genre: 'Dark Neo-Classical Cello',
    affinity: '91% Affinity',
    listeners: '42.8k monthly listeners',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAawgRjqNtXIxFZmZ8RTKP8FN3aGirlia0K-sFhS_n1OQ2u7-upRh4YOrf_bLGwUVEuWY9CWBJxRnNtyvNuQgIuAfEHUr5RGm85xOc2XsOgrvD8kOdkApsqAKg7msjoTcaSehSHOiLGdOfRV55lyeajxTQwzDyhAjknDdIg-Q1YE3o4MCxGDbx8-18_K7SN7_9wNF8OGsm7ARD2I2zzIPaAxKAhP8LQv6tdn1C4HO67_wcXU3LqbXv3mQ',
  },
];

export const DISCOVER_TRENDING = [
  {
    rank: '01',
    title: 'Subsurface Velocity',
    artist: 'Echo Grid',
    plays: '1.4M plays',
    trend: '↑ +18%',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB4pp7iI035-UrZ1dNK5bR4J1abtKy6byaLJ7WD1JHXIdx4YtjesoG31eJhwSMlkK5yF_KGIb97XA__3Ec5j5maIqEy9LEcAOHRoJcHWTF3wFfhxJsk6FfYzyxqxlSrIb3CrY6jUNOHyyGyBvi5hkvsN4In9px2UnHT8nOWs-47fewntoOIKpeWjfe_R281yo9b0DgcFfThkKdpyYeZf8tG_YzhFWAr0OJ3iOl8FYOJ2jRW8pzjjjKDLg',
  },
  {
    rank: '02',
    title: 'Quiet Geometry',
    artist: 'Nora Vance',
    plays: '980K plays',
    trend: '↑ +24%',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCuGqhvC1ftYYaQ4Q1TicnboRPV4sKN70OXNyZLkgzNhMrbpAguk83NZdZ_f78Syr-zJbbyczX9WdzynPYSyIvlzLunEZGDm9xG4LaQIB4PkcDWtxkStPMtEO6Uw57SPDDT5gpjc5CXy524ndcBky0uzJZ_yRxQTxHlxTMqsLSCd_BcTtn7FvJKV7Y4VCqIwOcN5aBG9VcrOVFlaSR6Mcmd75inaR7QjfqKgR8U_O5GX9QUVzoF49GVTA',
  },
  {
    rank: '03',
    title: 'Memory of Glass',
    artist: 'Tate & Kessel',
    plays: '850K plays',
    trend: '— Stable',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA701Ym0ssEQPQ_02lv_RQlcDAS4g5_ko9vz6GeyG_83t5_vCotPzgMsL3bNyR9JxoIssGOIvjRqYTs8C_YCOti4syPddst28S5_opArK2yqZVPTE6vaZVSU_m4hE2-p1DzXL8PXJa6sA0czp0qTlrlpiVT7uMzzIbDftyT16J3RTLYEQ29y_pvSRqlot_BjWKVwt8yMD53qFr_rqFCm3YkaNBExJ0JAcyGdLReQ1l4MAJyiZrGOXAcKA',
  },
];
