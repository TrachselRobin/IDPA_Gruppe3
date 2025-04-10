// Menü ein-/ausblenden beim Klick
const burgerMenu = document.getElementById("menu-toggle");
const modal = document.getElementById("settings");

burgerMenu.addEventListener("click", () => {
    modal.showModal()
});
