
const CACHE_NAME = 'union-bank-cache-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/ub.png',
  '/logo192.png',
  '/logo512.png',
  '/lovable-uploads/9c04d07b-cc81-4eb3-bdb0-7dfc68f894ed.png',
  '/lovable-uploads/284bf278-c27b-4e8b-b3a4-65bad06b1369.png',
  '/sendmoney.png',
  '/receivemoney.png',
  '/paybills1.png',
  '/buyload2.png',
  '/visitbranch.png',
  '/depositcheck.png',
  '/buysellusd.png',
  '/activatecard.png',
  '/dashboard.png',
  '/sendreceive.png',
  '/paybills.png',
  '/buyload.png',
  '/more.png'
];

// Install event - cache all static resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          console.log('Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // Claim clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fetch from network and update cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a one-time use stream
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                // Add the request/response pair to the cache
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
  if (event.tag === 'sync-transactions') {
    event.waitUntil(syncTransactions());
  }
});

// Function to sync transactions
function syncTransactions() {
  // Implementation for syncing transactions when back online
  console.log('Syncing transactions');
  return Promise.resolve();
}
