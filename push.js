const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BGzE02bVzEP4wOG-MeQQjwaTDaQVPt09tPYqFc3O71ybX7ku8YHKk-aJKL1S4FP6FUlx_GSyBtMKFQzfsJHezYY",
    "privateKey": "mtyHtLKLJjsPFqA7JZjP0Eh8JbbiBKhEQhMYfSh2P4M"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fsg_rMW3YU4:APA91bEBZv8jy2wXgBt2WCN2cuGWpbXOzRAxZ-fTyomlTzyRBT2jOwPDnQNB51grQsIp8hg9KQeNaAwaO0HfGTbifswp52lMo8k9zk_MmG2ysW8454v_KCAALmReC2PVS0Cz3frto0_t",
    "keys": {
        "p256dh": "BG3LMBVmyljBiSQAVFjbr6W6uGYEGUPiz5bkWZ1JTFEYogjMjM4f7iXBsyJHP6nsumiJqVo+zsFXvXVt+83uOzc=",
        "auth": "zAA6vnaKmtm0/k1IKO6rPQ=="
    }
};

const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '254595331674',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);