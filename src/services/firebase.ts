import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  User,
  Auth,
} from 'firebase/auth';
import { UserAuthProfile } from '../types';

// Load Firebase credentials from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Check if Firebase credentials have been supplied by the user
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'your_firebase_api_key_here' &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== 'your_project_id'
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
  } catch (err) {
    console.warn('Firebase initialization error:', err);
  }
}

export function formatFirebaseUser(user: User): UserAuthProfile {
  return {
    id: user.uid,
    name: user.displayName || user.email?.split('@')[0] || 'Sonic Listener',
    email: user.email || 'user@sonic.ai',
    avatar:
      user.photoURL ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    joinedDate: user.metadata?.creationTime
      ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })
      : 'Joined Today',
    plan: 'Hi-Fi Master',
    region: 'India 🇮🇳',
    preferredQuality: '320k',
    theme: 'dark',
    isLoggedIn: true,
  };
}

/**
 * Sign up with Email and Password
 */
export async function signupWithFirebase(
  email: string,
  pass: string,
  displayName: string
): Promise<UserAuthProfile> {
  if (!isFirebaseConfigured || !auth) {
    // Graceful offline/local mode fallback when credentials are not yet entered
    const mockUser: UserAuthProfile = {
      id: `usr_${Date.now()}`,
      name: displayName.trim() || email.split('@')[0] || 'Sonic Listener',
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      joinedDate: 'Joined Today',
      plan: 'Hi-Fi Master',
      region: 'India 🇮🇳',
      preferredQuality: '320k',
      theme: 'dark',
      isLoggedIn: true,
    };
    persistLocalAuth(mockUser);
    return mockUser;
  }

  const credential = await createUserWithEmailAndPassword(auth, email, pass);
  if (displayName && credential.user) {
    try {
      await updateProfile(credential.user, { displayName });
    } catch {}
  }
  const profile = formatFirebaseUser(credential.user);
  persistLocalAuth(profile);
  return profile;
}

/**
 * Sign in with Email and Password
 */
export async function loginWithFirebase(
  email: string,
  pass: string
): Promise<UserAuthProfile> {
  if (!isFirebaseConfigured || !auth) {
    // Graceful offline/local mode fallback
    const mockUser: UserAuthProfile = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0] || 'Sonic Listener',
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      joinedDate: 'Joined Recently',
      plan: 'Hi-Fi Master',
      region: 'India 🇮🇳',
      preferredQuality: '320k',
      theme: 'dark',
      isLoggedIn: true,
    };
    persistLocalAuth(mockUser);
    return mockUser;
  }

  const credential = await signInWithEmailAndPassword(auth, email, pass);
  const profile = formatFirebaseUser(credential.user);
  persistLocalAuth(profile);
  return profile;
}

/**
 * Sign in with Google Popup
 */
export async function loginWithGoogle(): Promise<UserAuthProfile> {
  if (!isFirebaseConfigured || !auth) {
    const mockUser: UserAuthProfile = {
      id: `google_${Date.now()}`,
      name: 'Google Listener',
      email: 'user@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      joinedDate: 'Joined via Google',
      plan: 'Hi-Fi Master',
      region: 'India 🇮🇳',
      preferredQuality: '320k',
      theme: 'dark',
      isLoggedIn: true,
    };
    persistLocalAuth(mockUser);
    return mockUser;
  }

  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);
  const profile = formatFirebaseUser(credential.user);
  persistLocalAuth(profile);
  return profile;
}

/**
 * Send password reset email
 */
export async function resetPasswordWithFirebase(email: string): Promise<void> {
  if (!isFirebaseConfigured || !auth) {
    return; // Demo simulated success
  }
  await sendPasswordResetEmail(auth, email);
}

/**
 * Sign out
 */
export async function logoutFromFirebase(): Promise<void> {
  if (auth && isFirebaseConfigured) {
    try {
      await signOut(auth);
    } catch {}
  }
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
  persistLocalAuth(loggedOut);
}

/**
 * Subscribe to Auth State Changes
 */
export function subscribeToFirebaseAuthState(
  callback: (user: UserAuthProfile | null) => void
): () => void {
  if (!auth || !isFirebaseConfigured) {
    return () => {};
  }
  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      const profile = formatFirebaseUser(firebaseUser);
      persistLocalAuth(profile);
      callback(profile);
    } else {
      callback(null);
    }
  });
}

function persistLocalAuth(profile: UserAuthProfile) {
  try {
    localStorage.setItem('sonic_auth_user', JSON.stringify(profile));
    localStorage.setItem('sonic_user_name', profile.name);
    window.dispatchEvent(new CustomEvent('sonic_auth_change', { detail: profile }));
  } catch {}
}
export { app };