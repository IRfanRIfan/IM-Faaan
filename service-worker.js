const CACHE_NAME = 'irfan-portfolio-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './css/custom.css',
  './js/jquery.min.js',
  './js/bootstrap.min.js',
  './js/main.js',
  './images/main.png', 
  './images/icon-192.png',
  './images/icon-512.png'
  // Tambahkan file gambar lain di sini jika ingin bisa dibuka offline
];

// 1. Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Menyimpan file ke cache...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// 2. Activate Service Worker (Bersihkan cache lama jika ada update)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Menghapus cache lama...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Fetch (Mengambil data dari cache jika offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Jika ada di cache, gunakan cache. Jika tidak, ambil dari internet.
        return response || fetch(event.request);
      })
  );
});