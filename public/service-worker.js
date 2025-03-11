
const CACHE_NAME = 'union-bank-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/lovable-uploads/3a9c61a0-d575-47f7-b413-c964b4a6e931.png',
  '/lovable-uploads/9c04d07b-cc81-4eb3-bdb0-7dfc68f894ed.png',
  '/lovable-uploads/284bf278-c27b-4e8b-b3a4-65bad06b1369.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Claim clients immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
