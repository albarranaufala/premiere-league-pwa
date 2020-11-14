import listener from './listener.js';

const loadHome = (standings = []) => {
    const table = document.getElementById('standingsTable');
    if (standings.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="11" class="center-align">Data tidak ada.</td>
            </tr>
        `;
    } else {
        table.innerHTML = standings
            .map(item => `
                <tr>
                    <td>${item.position}</td>
                    <td>
                        <img src="${item.team.crestUrl}" alt="${item.team.name}" class="responsive-img" width="25">
                    </td>
                    <td style="text-align: left;">${item.team.name}</td>
                    <td>${item.playedGames}</td>
                    <td>${item.won}</td>
                    <td>${item.draw}</td>
                    <td>${item.lost}</td>
                    <td>${item.goalsFor}</td>
                    <td>${item.goalsAgainst}</td>
                    <td>${item.goalDifference}</td>
                    <td>${item.points}</td>
                </tr>
            `)
            .reduce((acc, item) => acc + item);
    }
}

const loadTeams = (teams = []) => {
    const teamsContainer = document.getElementById('teamsContainer');
    if (teams.length === 0) {
        teamsContainer.innerHTML = `
            <div class="col s12 center-align" style="padding:1rem">
                Data tidak ada.
            </div>
        `
    } else {
        teamsContainer.innerHTML = teams
            .map(item => `
                <div class="col s12 m6">
                    <div class="card horizontal card-team" data-id="${item.id}">
                        <div class="card-image valign-wrapper" style="padding:2rem">
                            <img style="width:50px; max-height:50px" src="${item.crestUrl}">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <h2 style="margin: 0; margin-bottom: 1rem; font-size: 18px; font-weight: bold;">${item.name}</h2>
                                <p>${item.venue}</p>
                            </div>
                            <div class="card-action" style="display: flex; justify-content: space-between; align-items: center;">
                                <a href="${item.website}" target="_blank" rel="noopener noreferrer">Website</a>
                                <button onclick="deleteFavoriteTeam(${item.id})" class="btn-floating red waves-effect waves-light btn-unfavorite" type="button" style="display:none">
                                    <i class="material-icons">favorite</i>
                                </button>
                                <button onclick="addFavoriteTeam(${item.id},'${item.crestUrl}','${item.name}','${item.venue}','${item.website}')" class="btn-floating red waves-effect waves-light btn-favorite" type="button" style="display:none">
                                    <i class="material-icons">favorite_border</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            .reduce((acc, item) => acc + item);

        const cardTeam = document.querySelectorAll('.card-team');
        cardTeam.forEach(el => {
            const id = el.dataset.id;
            const btnFavorite = el.querySelector('.btn-favorite');
            const btnUnfavorite = el.querySelector('.btn-unfavorite');

            btnFavorite.addEventListener("click", () => {
                btnFavorite.style.display = 'none'
                btnUnfavorite.style.display = 'block';
            });
            
            btnUnfavorite.addEventListener("click", () => {
                btnUnfavorite.style.display = 'none';
                btnFavorite.style.display = 'block';
            });
            
            listener.isTeamFavorited(id)
                .then(isFavorited => {
                    if(isFavorited){
                        btnUnfavorite.style.display = 'block';
                    } else {
                        btnFavorite.style.display = 'block';
                    }
                });
        });
    }
}

const loadFavoriteTeams = (favoriteTeams = []) => {
    const favoriteTeamsContainer = document.getElementById('favoriteTeamsContainer');
    if (favoriteTeams.length === 0) {
        favoriteTeamsContainer.innerHTML = `
            <div class="col s12 center-align" style="padding:1rem">
                Data tidak ada.
            </div>
        `
    } else {
        favoriteTeamsContainer.innerHTML = favoriteTeams
            .map(item => `
                <div class="col s12 m6">
                    <div class="card horizontal card-team" data-id="${item.id}">
                        <div class="card-image valign-wrapper" style="padding:2rem">
                            <img style="width:50px; max-height:50px" src="${item.logo}">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <h2 style="margin: 0; margin-bottom: 1rem; font-size: 18px; font-weight: bold;">${item.name}</h2>
                                <p>${item.venue}</p>
                            </div>
                            <div class="card-action" style="display: flex; justify-content: space-between; align-items: center;">
                                <a href="${item.website}" target="_blank" rel="noopener noreferrer">Website</a>
                                <button onclick="deleteFavoriteTeam(${item.id})" class="btn-floating red waves-effect waves-light btn-delete" type="button">
                                    <i class="material-icons">delete</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            .reduce((acc, item) => acc + item);

            const btnDeletes = document.querySelectorAll('.btn-delete');
            btnDeletes.forEach(btn => {
                btn.addEventListener('click', () => {
                    listener.getAllFavoriteTeams();
                });
            });
    }
}

export default {
    loadHome,
    loadTeams,
    loadFavoriteTeams,
}