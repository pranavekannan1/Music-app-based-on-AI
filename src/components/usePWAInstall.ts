import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [isInstalled, setIsInstalled] =
    useState(false);

  const [isIOS, setIsIOS] =
    useState(false);

  const [isInstallSupported, setIsInstallSupported] =
    useState(false);

  useEffect(() => {
    const checkInstalled = () => {
      const standalone =
        window.matchMedia(
          '(display-mode: standalone)'
        ).matches ||
        (window.navigator as Navigator & {
          standalone?: boolean;
        }).standalone === true;

      setIsInstalled(standalone);
    };

    checkInstalled();

    const userAgent =
      window.navigator.userAgent.toLowerCase();

    const ios =
      /iphone|ipad|ipod/.test(userAgent) ||
      (window.navigator.platform === 'MacIntel' &&
        window.navigator.maxTouchPoints > 1);

    setIsIOS(ios);

    /*
     * If the browser supports the native
     * beforeinstallprompt event, remember that.
     */
    const handleBeforeInstallPrompt = (
      event: Event
    ) => {
      event.preventDefault();

      const installEvent =
        event as BeforeInstallPromptEvent;

      setDeferredPrompt(installEvent);
      setIsInstallSupported(true);
    };

    /*
     * Fired after the app has been installed.
     */
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      'appinstalled',
      handleAppInstalled
    );

    /*
     * Give Chrome/Edge time to fire
     * beforeinstallprompt after the page loads.
     */
    const checkInstallSupport = window.setTimeout(() => {
      if (
        'BeforeInstallPromptEvent' in window ||
        'onbeforeinstallprompt' in window
      ) {
        setIsInstallSupported(true);
      }
    }, 1500);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        'appinstalled',
        handleAppInstalled
      );

      window.clearTimeout(
        checkInstallSupport
      );
    };
  }, []);

  const install = async (): Promise<
    'installed' | 'manual' | 'dismissed'
  > => {
    /*
     * Native Chrome / Edge install prompt.
     */
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();

        const { outcome } =
          await deferredPrompt.userChoice;

        setDeferredPrompt(null);

        if (outcome === 'accepted') {
          setIsInstalled(true);
          return 'installed';
        }

        return 'dismissed';
      } catch (error) {
        console.error(
          'SonicAI PWA installation failed:',
          error
        );

        setDeferredPrompt(null);
        return 'manual';
      }
    }

    /*
     * No native prompt is currently available.
     * The button will show the browser-specific
     * installation instructions instead.
     */
    return 'manual';
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    isInstallSupported,
    install,
  };
}