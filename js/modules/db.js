let dbPromise = idb.open('premiere-league-db', 1, upgradeDB => {
    if (!upgradeDB.objectStoreNames.contains('favorites')) {
        upgradeDB.createObjectStore('favorites');
    }
});

const getAllFavorites = () => {
    return dbPromise
        .then(db => {
            let tx = db.transaction('favorites','readonly')
            let store = tx.objectStore('favorites')

            return store.getAll()
        })
        .then(data => data);
}

const addFavorite = ({ id, logo, name, venue, website }) => {
    dbPromise
        .then(db => {
            let tx = db.transaction('favorites', 'readwrite');
            let store = tx.objectStore('favorites');
            let item = {
                id: id,
                logo: logo,
                name: name,
                venue: venue,
                website: website,
                created: new Date().getTime()
            };
            store.put(item, id);
            return tx.complete;
        })
        .then(() => console.log(`Add ${name} to favorite success!`))
        .catch(() => console.log(`Add to favorite failed`));
}

const isFavorited = id => {
    return dbPromise
        .then(db => {
            let tx = db.transaction("favorites", "readonly");
            let store = tx.objectStore("favorites");
            return store.get(parseInt(id));
        })
        .then(data => data != undefined);
}

const deleteFavorite = id => {
    dbPromise
        .then(db => {
            let tx = db.transaction('favorites', 'readwrite')
            let store = tx.objectStore('favorites')
            store.delete(id)
            return tx.complete
        })
        .then(() => console.log('Favorite deleted.'))
}

export default {
    getAllFavorites,
    addFavorite,
    isFavorited,
    deleteFavorite,
}