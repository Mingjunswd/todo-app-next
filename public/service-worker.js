self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('todo-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/static/js/bundle.js',
                '/static/css/main.css',
            ]);
        })
    );
    console.log('Service Worker installed.');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
