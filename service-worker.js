// Simple but robust service worker for Kantin Bu Rom
const CACHE_NAME = 'burom-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/menu.html',
  '/kebijakan-privasi.html',
  '/tentang-kami.html',
  '/robots.txt',
  '/sitemap.xml',
  '/css/index.css',
  '/css/styles.css',
  '/js/index.js',
  '/js/menu.js',
  '/js/chatbot.js',
  '/js/googlemapss.js',
  '/image/IMG-11022025-buRom.webp',
  '/image/IMG-11022025-buRom.ico',
  '/image/QRIS.png',
  '/image/QRIS.webp',
  '/image/QRIS2.webp',
  '/image/tentangkami.jpg',
  '/menu.txt',
  '/js/visit-notify.js',
//   '/aplikasi/Kantin%20bu%20Rom.apk',
  '/sitemap.xml',
  '/css/pwa-install.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.2.3/purify.min.js',
  'https://unpkg.com/sweetalert/dist/sweetalert.min.js',
  'https://www.chatbase.co/embed.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const url of ASSETS) {
        try {
          await cache.add(url);
        } catch (err) {
          console.warn('[SW] Gagal cache:', url, err);
        }
      }
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) {
        fetch(request).then(response => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
          }
        }).catch(() => {});
        return cached;
      }

      return fetch(request).then(response => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      }).catch(() => {
        if (request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('push', event => {
  let data = { title: 'Kantin Bu Rom', body: 'Ada notifikasi baru', url: '/' };
  try {
    if (event.data) data = event.data.json();
  } catch (err) {
    data.body = event.data ? event.data.text() : data.body;
  }

  const options = {
    body: data.body,
    icon: '/image/IMG-11022025-buRom.webp',
    badge: '/image/IMG-11022025-buRom.webp',
    data: { url: data.url || '/' },
    vibrate: [100, 50, 100],
    actions: [{ action: 'open', title: 'Buka Aplikasi' }]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url === target && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(target);
    })
  );
});
