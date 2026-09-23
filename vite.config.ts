import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),

      VitePWA({
        registerType: 'autoUpdate',

        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
          'rezbeatsai-icon.jpg',
          'pwa-192x192.png',
          'pwa-512x512.png',
        ],

        manifest: {
          id: '/',
          name: 'RezbeatsAi',
          short_name: 'RezbeatsAi',
          description:
            'Premium AI-powered music player with continuous background streaming.',
          theme_color: '#0d0e15',
          background_color: '#0d0e15',
          display: 'standalone',
          start_url: '/',
          scope: '/',

          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },

        workbox: {
          globPatterns: [
            '**/*.{js,css,html,ico,png,svg,woff,woff2}',
          ],

          maximumFileSizeToCacheInBytes: 5000000,

          runtimeCaching: [
            {
              urlPattern:
                /^https:\/\/images\.unsplash\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'unsplash-images',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
            {
              urlPattern:
                /^https:\/\/upload\.wikimedia\.org\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'wikimedia-audio',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 7,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },

        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch:
        process.env.DISABLE_HMR === 'true'
          ? null
          : {},
    },
  };
});

