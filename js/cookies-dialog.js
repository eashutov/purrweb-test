const cookies = document.getElementById('cookies__dialog');

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        cookies.style.display = "flex";
    }, 10000);
});

function closeCookies() {
    cookies.style.display = "none";
}