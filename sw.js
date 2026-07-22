// Prosty Service Worker pod PWA i Push Notification
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');
});

// Obsługa przychodzących powiadomień PUSH
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'BrainlyHQ', body: 'New update available!' };

  const options = {
    body: data.body,
    icon: 'assets/icon-192.png',
    badge: 'assets/fire.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Reakcja na kliknięcie powiadomienia
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
