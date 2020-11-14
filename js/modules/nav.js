import loadPage from './page.js'

const loadNav = () => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState != 4 || this.status != 200) return;

        document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
            elm.innerHTML = xhttp.responseText;
        });

        document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
            elm.addEventListener("click", event => {
                const sidenav = document.querySelector(".sidenav");
                M.Sidenav.getInstance(sidenav).close();

                const page = event.target.getAttribute("href").substr(1);
                loadPage(page);
            });
        });
    };
    xhttp.open("GET", "/view/components/nav.html", true);
    xhttp.send();
}

export default loadNav;