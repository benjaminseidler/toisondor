const CACHE = 'rally-v1';
const APP_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/leaflet.css',
  './js/config.js',
  './js/map.js',
  './js/app.js',
  './js/leaflet.js',
  './img/campsite-map.png',
  './img/icon-192.png',
  './img/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(APP_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Map tiles: network first, cache fallback
  if (url.hostname.endsWith('tile.openstreetmap.org')) {
    e.respondWith(
      fetch(e.request)
        .then(r => { const c = r.clone(); caches.open(CACHE).then(cache => cache.put(e.request, c)); return r; })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Everything else: cache first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
