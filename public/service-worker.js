
const CACHE_NAME = 'union-bank-cache-v5';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/ub.png',
  '/logo192.png',
  '/logo512.png',
  '/sendmoney.png',
  '/receivemoney.png',
  '/paybills1.png',
  '/buyload2.png',
  '/visitbranch.png',
  '/depositcheck.png',
  '/buysellusd.png',
  '/activatecard.png'
];

// Install event - cache all static resources
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache, caching URLs');
        return cache.addAll(urlsToCache);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
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

// Fetch event - cache-first strategy for images, network-first for other resources
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Check if the request is for an image
  const isImage = event.request.destination === 'image' || 
                  requestUrl.pathname.match(/\.(png|jpg|jpeg|svg|gif)$/i);
                 
  if (isImage) {
    // For images, use cache-first strategy
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          // Return cached image
          return cachedResponse;
        }
        
        // If not in cache, fetch from network and cache
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Cache the fetched image
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log('Image cached:', requestUrl.pathname);
              });
              
            return response;
          })
          .catch(error => {
            console.error('Fetch error:', error);
            // You could return a placeholder image here
          });
      })
    );
  } else {
    // For non-image resources, use network-first strategy
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If we have a valid response, clone it and cache it
          if (response && response.status === 200 && response.type === 'basic') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try to return from cache
          return caches.match(event.request);
        })
    );
  }
});

// Prefetch important images when idle
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PREFETCH_IMAGES') {
    const imagesToPrefetch = [
      '/sendmoney.png',
      '/receivemoney.png',
      '/paybills1.png',
      '/buyload2.png',
      '/visitbranch.png',
      '/depositcheck.png',
      '/buysellusd.png',
      '/activatecard.png'
    ];
    
    // Prefetch images when browser is idle
    if ('requestIdleCallback' in self) {
      self.requestIdleCallback(() => {
        caches.open(CACHE_NAME).then(cache => {
          imagesToPrefetch.forEach(imageUrl => {
            cache.add(new Request(imageUrl, { mode: 'no-cors' }))
              .then(() => console.log('Prefetched:', imageUrl))
              .catch(err => console.error('Failed to prefetch:', imageUrl, err));
          });
        });
      });
    }
  }
});
