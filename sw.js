const CACHE = 'rally-v33';
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
  './js/leaflet-rotate.js',
  './img/campsite-map.jpg',
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
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
