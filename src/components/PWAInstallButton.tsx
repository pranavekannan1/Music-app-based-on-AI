import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const {
    isInstallable,
    isInstalled,
    isIOS,
    install,
  } = usePWAInstall();

  const [showIOSGuide, setShowIOSGuide] =
    useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        aria-label="Install RezBeatsAI Music App"
        className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ab7bf6] to-[#7f39fb] px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_2px_12px_rgba(127,57,251,0.3)] hover:brightness-110 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-sm">
          download
        </span>

        Install App
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          aria-label="Install RezBeatsAI Music App"
          className="flex items-center gap-1.5 rounded-full border border-[#40385c] bg-[#1a152d]/60 px-3 py-1.5 text-xs font-semibold text-[#dbb8ff] hover:bg-[#1a152d] transition-all"
        >
          <span className="material-symbols-outlined text-sm">
            phone_iphone
          </span>

          Install App
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() =>
              setShowIOSGuide(false)
            }
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

                  Add to Home Screen
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setShowIOSGuide(false)
                  }
                  aria-label="Close"
                  className="text-gray-400 hover:text-white"
                >
                  <span className="material-symbols-outlined text-lg">
                    close
                  </span>
                </button>
              </div>

              <div className="text-xs text-gray-300 leading-relaxed">
                Install RezBeatsAI Music on your iPhone or iPad:

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
                    3. Tap "Add" to install RezBeatsAI Music.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowIOSGuide(false)
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
  }

  return null;
};
