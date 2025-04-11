// Menü ein-/ausblenden beim Klick
const burgerMenu = document.getElementById("menu-toggle");
const modal = document.getElementById("settings");

burgerMenu.addEventListener("click", () => {
    modal.showModal()
});

function onDialogClose() {
    stationInput.value = station;
    reloadData(true);
}

modal.addEventListener("close", () => {
    onDialogClose()
});