importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if(workbox){
    console.log('Workbox berhasil dimuat.');
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/manifest.json', revision: '1'},
        { url: '/index.html', revision: '1'},
        { url: '/view/components/nav.html', revision: '1'},
        { url: '/view/pages/home.html', revision: '1'},
        { url: '/view/pages/teams.html', revision: '1'},
        { url: '/view/pages/favorites.html', revision: '1'},
        { url: '/css/materialize.min.css', revision: '1'},
        { url: '/js/idb.js', revision: '1'},
        { url: '/js/materialize.min.js', revision: '1'},
        { url: '/js/modules/nav.js', revision: '1'},
        { url: '/js/modules/api.js', revision: '1'},
        { url: '/js/modules/page.js', revision: '1'},
        { url: '/js/modules/pwa.js', revision: '1'},
        { url: '/js/modules/dom.js', revision: '1'},
        { url: '/js/modules/listener.js', revision: '1'},
        { url: '/js/modules/db.js', revision: '1'},
        { url: '/js/main.js', revision: '1'},
        { url: '/img/premiere-league.png', revision: '1'},
        { url: '/icon-512.png', revision: '1'},
        { url: '/icon-192.png', revision: '1'},
        { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1'},
        { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1'},
    ]);

    workbox.routing.registerRoute(/.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ]
        })
    );

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/'),
        workbox.strategies.staleWhileRevalidate()
    );

    workbox.routing.registerRoute(/.*(?:googleapis|gstatic)\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );

    workbox.routing.registerRoute(/\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'src-resources',
        })
    );

    workbox.routing.registerRoute(
        new RegExp('/view/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    );

    workbox.routing.registerRoute(
        new RegExp('/view/components/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'components'
        })
    );
} else {
    console.log('Workbox gagal dimuat.');
}

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