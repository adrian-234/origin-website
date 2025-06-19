const body = document.getElementsByTagName("body")[0];
const navbar = document.getElementById("trackbar-navbar");

const topPadding = 10;
const bottomPadding = 10;

window.addEventListener("scroll", () => {
    let progress = Math.min(window.scrollY / (body.offsetHeight - window.innerHeight), 1);
    let pos = progress * (window.innerHeight - navbar.offsetHeight);
    pos = Math.max(topPadding, pos);
    pos = Math.min(window.innerHeight - bottomPadding - navbar.offsetHeight, pos)
    navbar.style.top = pos + "px";
})