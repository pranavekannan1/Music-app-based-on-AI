import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const {
    isInstallable,
    isInstalled,
    isIOS,
    install,
  } = usePWAInstall();

  const [showGuide, setShowGuide] =
    useState(false);

  const [installing, setInstalling] =
    useState(false);

  if (isInstalled) {
    return null;
  }

  const handleInstall = async () => {
    if (installing) {
      return;
    }

    setInstalling(true);

    const result = await install();

    setInstalling(false);

    /*
     * Native installation was unavailable.
     * Show manual instructions instead.
     */
    if (
      result === 'manual' ||
      result === 'dismissed'
    ) {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleInstall}
        disabled={installing}
        aria-label="Install SonicAI App"
        className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ab7bf6] to-[#7f39fb] px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_2px_12px_rgba(127,57,251,0.3)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-wait"
      >
        <span className="material-symbols-outlined text-sm">
          {installing
            ? 'hourglass_top'
            : isInstallable
              ? 'download'
              : isIOS
                ? 'phone_iphone'
                : 'download'}
        </span>

        {installing
          ? 'Installing...'
          : 'Install App'}
      </button>

      {showGuide && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-[#13111e] border border-[#2b2545] p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between border-b border-[#2b2545] pb-3 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#dbb8ff]">
                  download
                </span>

                Install SonicAI
              </h3>

              <button
                type="button"
                onClick={() =>
                  setShowGuide(false)
                }
                aria-label="Close"
                className="text-gray-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">
                  close
                </span>
              </button>
            </div>

            {isIOS ? (
              <div className="text-xs text-gray-300 leading-relaxed">
                Install SonicAI on your iPhone or iPad:

                <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#2b2545] bg-[#1a152d] p-2.5 font-medium text-white">
                  <span className="material-symbols-outlined text-base text-[#dbb8ff]">
                    ios_share
                  </span>

                  <span>
                    1. Tap the Share button in Safari.
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#2b2545] bg-[#1a152d] p-2.5 font-medium text-white">
                  <span className="material-symbols-outlined text-base text-[#dbb8ff]">
                    add_box
                  </span>

                  <span>
                    2. Select "Add to Home Screen".
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#2b2545] bg-[#1a152d] p-2.5 font-medium text-white">
                  <span className="material-symbols-outlined text-base text-[#dbb8ff]">
                    check_circle
                  </span>

                  <span>
                    3. Tap "Add".
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-300 leading-relaxed">
                <p>
                  SonicAI can be installed as a desktop
                  app from your browser.
                </p>

                <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#2b2545] bg-[#1a152d] p-2.5 font-medium text-white">
                  <span className="material-symbols-outlined text-base text-[#dbb8ff]">
                    more_vert
                  </span>

                  <span>
                    1. Open your browser menu.
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#2b2545] bg-[#1a152d] p-2.5 font-medium text-white">
                  <span className="material-symbols-outlined text-base text-[#dbb8ff]">
                    install_desktop
                  </span>

                  <span>
                    2. Choose "Install SonicAI" or
                    "Install app".
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#2b2545] bg-[#1a152d] p-2.5 font-medium text-white">
                  <span className="material-symbols-outlined text-base text-[#dbb8ff]">
                    check_circle
                  </span>

                  <span>
                    3. Confirm the installation.
                  </span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() =>
                setShowGuide(false)
              }
              className="mt-5 w-full rounded-full bg-gradient-to-r from-[#ab7bf6] to-[#7f39fb] py-2.5 text-xs font-bold text-white hover:brightness-110 active:scale-95 transition-all"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};