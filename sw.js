/* ============================================================
   Service Worker — Mohammed Jameel Portfolio (PWA)
   Strategy:
   - Navigations: network-first (fresh HTML), offline fallback to cache
   - Known CDNs (boxicons): stale-while-revalidate
   - Same-origin static assets (incl. self-hosted fonts): cache-first
   - Everything else (e.g. AI API): passthrough
   Bump CACHE_NAME when shipping new asset versions.
   ============================================================ */

const CACHE_NAME = 'mj-portfolio-v3';

const CORE_ASSETS = [
  './',
  './index.html',
  './404.html',
  './style.css',
  './light-theme.css',
  './chatbot-style.css',
  './manifest.json',
  './assets/favicon.svg',
  './assets/avatar.webp',
  './assets/og-card.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/fonts/fonts.css'
];

const CDN_PREFIXES = [
  'https://unpkg.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Known CDNs: stale-while-revalidate
  if (CDN_PREFIXES.some((prefix) => url.href.startsWith(prefix))) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        const network = fetch(request)
          .then((response) => {
            if (response && response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // Cross-origin (e.g. AI endpoint, form service): passthrough
  if (url.origin !== self.location.origin) return;

  // Page navigations: network-first with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Same-origin static assets: cache-first, then network + cache fill
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
