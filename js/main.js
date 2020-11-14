import loadPage from './modules/page.js';
import loadNav from './modules/nav.js';
import pwa from './modules/pwa.js';

let page = window.location.hash.substr(1);
page ? page = page : page = 'home';

pwa.serviceWorkerRegistration();
pwa.notification();

document.addEventListener('DOMContentLoaded', () => {
    loadNav();
    loadPage(page);
})