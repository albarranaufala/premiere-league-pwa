import db from './db.js';
import dom from './dom.js';

const getAllFavoriteTeams = () => {
    db.getAllFavorites()
        .then(data => {
            dom.loadFavoriteTeams(data);
        });
}

const pushNotification = msg => {
    const title = 'Notifikasi';
    const options = {
        body: msg,
        icon: '/icon-512.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    }
}

const addFavoriteTeam = (id,logo,name,venue,website) => {

    db.addFavorite({id,logo,name,venue,website});

    M.toast({html: `Berhasil memfavoritkan ${name}`, classes: 'rounded'});

    pushNotification(`Berhasil memfavoritkan ${name}`);
}

const isTeamFavorited = id => {
    return db.isFavorited(id);
}

const deleteFavoriteTeam = id => {
    db.deleteFavorite(id);

    M.toast({html: 'Berhasil menghapus tim dari favorit', classes: 'rounded'});

    pushNotification('Berhasil menghapus tim dari favorit');
}

export default {
    addFavoriteTeam,
    isTeamFavorited,
    deleteFavoriteTeam,
    getAllFavoriteTeams,
}