self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('pwa-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/icons',
        '/icons/icon-512.png',
        '/icons/icon-192.png',
        '/index.html',
        '/portfolio.html',
        '/index.js',       
        '/portfolio.js',
        '/portfolio.html',
        '/privacy-policy.html',
        'icon512_maskable.png',
        'icon512_rounded.png',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png',
        '/graphics',
        '/clients',
        '/functions/sendMessage.js',
        '/pics',
        '/pics/abs.png',
        '/graphics',
        '/graphics/g1.jpg',
        '/graphics/g2.jpg',
        '/graphics/g3.jpg',
        '/graphics/g4.jpg',
        '/graphics/g5.png',
        '/graphics/g6.jpg',
        '/graphics/g7.jpg',
        '/graphics/g8.jpg',
        '/graphics/g9.jpg',
        '/graphics/g10.jpg',
        '/graphics/g11.jpg',
        '/graphics/g12.jpg',
        '/graphics/g13.png',
        '/graphics/g14.jpg',
        '/graphics/g15.jpg',
        '/graphics/g16.jpg',
        '/graphics/g17.jpg',
        '/graphics/g18.jpg',
        '/graphics/g19.jpg',
        '/graphics/g20.jpg',
        '/graphics/g21.jpg',
        '/graphics/g22.jpg',
        '/graphics/g23.jpg',
        '/graphics/g24.jpg',
        '/graphics/g25.jpg',
        '/graphics/g26.jpg',
        '/graphics/g27.jpg',
        '/graphics/g28.jpg',
        '/graphics/g29.jpg',
        '/graphics/g30.jpg',
        '/graphics/g31.jpg',
        '/graphics/g32.jpg',
        '/graphics/g33.png',
        '/graphics/g34.jpg',
        '/graphics/g35.png'              
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
