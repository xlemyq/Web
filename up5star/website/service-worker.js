const CACHE_NAME = 'up5star-cache-v1';
const ASSETS = [
  '/index.html','/css/main.css','/css/responsive.css','/js/main.js','/js/form-validation.js','/js/calculator.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
