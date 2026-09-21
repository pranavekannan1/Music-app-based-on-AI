import React, { useState } from 'react';
import { UserAuthProfile } from '../types';
import { loginUser, signupUser } from '../services/musicService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserAuthProfile) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('pranavecse2226@gmail.com');
  const [name, setName] = useState('Pranav');
  const [password, setPassword] = useState('••••••••');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleQuickPranavLogin = () => {
    const user = loginUser('pranavecse2226@gmail.com', 'Pranav');
    showToast('Welcome back, Pranav!');
    setTimeout(() => {
      onAuthSuccess(user);
      onClose();
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Please provide an email address');
      return;
    }

    if (mode === 'signup') {
      const user = signupUser(email, name || 'Listener', password);
      showToast(`Account created! Welcome, ${user.name}`);
      setTimeout(() => {
        onAuthSuccess(user);
        onClose();
      }, 600);
    } else {
      const user = loginUser(email, name, password);
      showToast(`Logged in as ${user.name}`);
      setTimeout(() => {
        onAuthSuccess(user);
        onClose();
      }, 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in select-none">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-gradient-to-r from-[#7928ca] to-[#1db954] text-white text-xs font-semibold rounded-full shadow-2xl border border-white/20 animate-fade-in pointer-events-none">
          {toastMessage}
        </div>
      )}

      <div className="relative w-full max-w-md bg-[#16171d] border border-white/[0.12] rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col space-y-5">
        {/* Header & Close Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7928ca] to-[#dbb8ff] flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-2xl">account_circle</span>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#e3e2e8] font-display">
                {mode === 'login' ? 'Welcome to Sonic' : 'Create Sonic Account'}
              </h2>
              <p className="text-xs text-[#cec2d6]/80">
                High-Fidelity • 320kbps Master Audio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-[#24252e] hover:bg-[#343540] text-[#cec2d6] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* 1-Click Fast Login for Pranav */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#7928ca]/20 to-[#1db954]/15 border border-[#dbb8ff]/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#7928ca] flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
              P
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#e3e2e8] truncate">Continue as Pranav</p>
              <p className="text-[11px] text-[#dbb8ff] truncate">pranavecse2226@gmail.com</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickPranavLogin}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#7928ca] to-[#dbb8ff] text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex-shrink-0"
          >
            1-Click Log In
          </button>
        </div>

        {/* Tab switch between Log In and Sign Up */}
        <div className="flex bg-[#202129] p-1 rounded-2xl border border-white/[0.06]">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-gradient-to-r from-[#7928ca] to-[#dbb8ff] text-white shadow-md'
                : 'text-[#cec2d6] hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-gradient-to-r from-[#7928ca] to-[#dbb8ff] text-white shadow-md'
                : 'text-[#cec2d6] hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="text-[11px] font-semibold text-[#cec2d6] uppercase tracking-wider block mb-1">
                Your Full Name
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#202129] border border-white/[0.08] focus-within:border-[#dbb8ff]/60">
                <span className="material-symbols-outlined text-[#dbb8ff] text-lg">person</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pranav"
                  className="w-full bg-transparent text-xs text-[#e3e2e8] focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-semibold text-[#cec2d6] uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#202129] border border-white/[0.08] focus-within:border-[#dbb8ff]/60">
              <span className="material-symbols-outlined text-[#dbb8ff] text-lg">mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@domain.com"
                className="w-full bg-transparent text-xs text-[#e3e2e8] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#cec2d6] uppercase tracking-wider block mb-1">
              Password
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#202129] border border-white/[0.08] focus-within:border-[#dbb8ff]/60">
              <span className="material-symbols-outlined text-[#dbb8ff] text-lg">lock</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-xs text-[#e3e2e8] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#7928ca] via-[#508eff] to-[#1db954] text-white font-bold text-sm shadow-xl hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{mode === 'login' ? 'Sign In' : 'Complete Registration'}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </form>

        <p className="text-center text-[11px] text-[#cec2d6]/70">
          By continuing, your listening taste profile and repeated songs are synchronized securely to your device.
        </p>
      </div>
    </div>
  );
};
