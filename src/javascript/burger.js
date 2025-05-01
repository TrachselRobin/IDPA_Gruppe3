// Menü ein-/ausblenden beim Klick
const burgerMenu = document.getElementById("menu-toggle");
const modal = document.getElementById("settings");

/** 
 * Öffnet das Einstellungsdialog bei Klick auf das Burger-Menü. 
 */
burgerMenu.addEventListener("click", () => {
    modal.showModal()
});

/** 
 * Lädt aktuelle Daten neu, wenn Dialog geschlossen wird. 
 */
function onDialogClose() {
    stationInput.value = station;
    // reloadData(true);
}

modal.addEventListener("close", () => {
    onDialogClose()
});