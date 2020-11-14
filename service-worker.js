const CACHE_NAME = "premiere-league";
var urlsToCache = [
    "/",
    '/manifest.json',
    "/index.html",
    "/view/components/nav.html",
    "/view/pages/home.html",
    "/view/pages/teams.html",
    "/view/pages/favorites.html",
    "/css/materialize.min.css",
    "/js/idb.js",
    "/js/materialize.min.js",
    "/js/modules/nav.js",
    "/js/modules/api.js",
    "/js/modules/page.js",
    "/js/modules/pwa.js",
    "/js/modules/dom.js",
    "/js/modules/listener.js",
    "/js/modules/db.js",
    "/js/main.js",
    "/img/premiere-league.png",
    "/icon-512.png",
    "/icon-192.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",

];

self.addEventListener("install", event => {
    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

self.addEventListener("fetch", event => {
    const BASE_URL = "https://api.football-data.org/";
    if (event.request.url.indexOf(BASE_URL) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME)
            .then(cache => {
                return fetch(event.request)
                    .then(response => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    })
            })
        )
    } else {
        event.respondWith(
            caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(response => {
                if (response) {
                    // console.log(`Service Worker: Gunakan aset dari cache: ${response.url}`);
                    return response;
                }
                // console.log(`ServiceWorker: Memuat aset dari server: ${event.request.url}`);
                return fetch(event.request);
            })
        );
    }
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName != CACHE_NAME) {
                        console.log(`ServiceWorker: cache ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', event => {
    const body = event.data ? event.data.text() : 'Push message no payload';

    const options = {
        body: body,
        icon: '/icon-512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});