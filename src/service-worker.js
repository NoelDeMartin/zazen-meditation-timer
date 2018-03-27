var paths = [
    'index.html',
    'bell.wav',
    'manifest.json',
    'build/app.js',
    'build/app.css',
    'build/img/logo.png',
    'build/icons/icon_32.png',
    'build/icons/icon_64.png',
    'build/icons/icon_256.png',
    'build/fonts/fontawesome-webfont.eot',
    'build/fonts/fontawesome-webfont.woff2',
    'build/fonts/fontawesome-webfont.woff',
    'build/fonts/fontawesome-webfont.ttf',
    'build/fonts/Comfortaa-Regular.ttf',
    'build/fonts/PatrickHand-Regular.ttf',
];

var version = '0.0.1';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open('offline-' + version)
            .then(function(cache) {
                return cache.addAll(paths);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function(e) {
            return caches.open('offline-' + version).then(function(cache) {
                return cache.match((new URL(event.request.url)).pathname.endsWith('/')? 'index.html' : event.request);
            });
        })
    );
});
