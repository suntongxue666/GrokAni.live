// GrokAni Service Worker
// Monetag Ad Integration code has been removed

// Service Worker for GrokAni PWA
const CACHE_NAME = 'grokani-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  'https://coin-images.coingecko.com/coins/images/67370/large/m69hOU76_400x400.jpg?1752574248'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
      )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle background sync tasks
  console.log('Background sync triggered');
  return Promise.resolve();
}

// Push notification handling (for future features)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: 'https://coin-images.coingecko.com/coins/images/67370/large/m69hOU76_400x400.jpg?1752574248',
    badge: 'https://coin-images.coingecko.com/coins/images/67370/large/m69hOU76_400x400.jpg?1752574248',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open GrokAni',
        icon: 'https://coin-images.coingecko.com/coins/images/67370/large/m69hOU76_400x400.jpg?1752574248'
      },
      {
        action: 'close',
        title: 'Close notification',
        icon: 'https://coin-images.coingecko.com/coins/images/67370/large/m69hOU76_400x400.jpg?1752574248'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('GrokAni', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});