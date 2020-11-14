import dom from './dom.js';

const API_KEY = "4539cf4670404301be1d50550c373657";
const BASE_URL = "https://api.football-data.org";

let status = response => {
    if (response.status != 200) {
        console.log(`Error : ${response.status}`);
        return Promise.reject(new Error(response.statusText()));
    } else {
        return Promise.resolve(response);
    }
}

const fetchApi = function(url) {    
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    });
};

const getStandings = leagueID => {
    let isDataCachedEmpty = true;

    if('caches' in window) {
        caches.match(`${BASE_URL}/v2/competitions/${leagueID}/standings`)
            .then(response => {
                if(response){
                    response.json()
                        .then(data => {
                            isDataCachedEmpty = false;
                            dom.loadHome(data.standings[0].table);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            });
    }

    fetchApi(`${BASE_URL}/v2/competitions/${leagueID}/standings`)
        .then(status)
        .then(response => response.json())
        .then(data => {
            dom.loadHome(data.standings[0].table);
        })
        .catch(error => {
            if(isDataCachedEmpty){
                dom.loadHome();
            }
            console.log(error)
        });
}

const getTeams = leagueID => {
    let isDataCachedEmpty = true;

    if('caches' in window) {
        caches.match(`${BASE_URL}/v2/competitions/${leagueID}/teams`)
            .then(response => {
                if(response){
                    response.json()
                        .then(data => {
                            isDataCachedEmpty = false;
                            dom.loadTeams(data.teams);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            });
    }

    fetchApi(`${BASE_URL}/v2/competitions/${leagueID}/teams`)
        .then(status)
        .then(response => response.json())
        .then(data => {
            dom.loadTeams(data.teams);
        })
        .catch(error => {
            if(isDataCachedEmpty){
                dom.loadTeams();
            }
            console.log(error)
        });
}

export default {
    getStandings,
    getTeams,
};