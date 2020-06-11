

const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")


document.getElementById("button-search").addEventListener("click", () => {
    modal.classList.toggle("hide")
})