import api from './api.js';
import listener from './listener.js';

const loadPage = (page = 'home') => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) return

        const content = document.querySelector("#body-content");
        switch (this.status) {
            case 200:
                content.innerHTML = xhttp.responseText;
                switch (page) {
                    case 'home':
                        api.getStandings(2021);
                        break;
                    case 'teams':
                        api.getTeams(2021);
                        window.addFavoriteTeam = listener.addFavoriteTeam;
                        window.isTeamFavorited = listener.isTeamFavorited;
                        window.deleteFavoriteTeam = listener.deleteFavoriteTeam;
                        break;
                    case 'favorites':
                        listener.getAllFavoriteTeams();
                        window.deleteFavoriteTeam = listener.deleteFavoriteTeam;
                        break;
                }
                break;
            case 404:
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                break;
            default:
                content.innerHTML = "<p>Ups.. Halaman tidak dapat diakses.</p>";
        }
    };
    xhttp.open("GET", `/view/pages/${page}.html`, true);
    xhttp.send();
}

export default loadPage;