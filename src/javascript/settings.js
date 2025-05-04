const stationInput = document.getElementById("station-input");
const messageBox = document.getElementById("messages");

/**
 * Initialer Wert setzen setStationValue(station);
 */

/**
 * Speichert die Eingabe nach Validierung
 */
function save() {
    const inputValue = sanitizeInput(stationInput.value);
    if (isValidStationName(inputValue)) {
        station = inputValue;
        showMessage("Gespeichert!");
    } else {
        showMessage("Ungültiger Bahnhofname!");
    }
}

/**
 * Schließt das Einstellungsfenster
 */
function closeModal() {
    modal.close();
}

/**
 * Setzt den aktuellen Wert des Eingabefeldes.
 * @param {string} value - Der neue Stationsname.
 */
function setStationValue(value) {
    stationInput.value = value;
}

/**
 * Zeigt eine temporäre Benachrichtigung im Nachrichtenbereich an.
 * @param {string} message - Der Nachrichtentext.
 */
function showMessage(message) {
    const messageElement = document.createElement("p");
    messageElement.classList.add("message");
    messageElement.innerText = message;

    messageBox.append(messageElement);

    setTimeout(() => {
        if (messageElement.parentElement) {
            messageElement.remove();
        }
    }, 3000);
}

/**
 * Entfernt potenziell gefährliche Zeichen aus der Eingabe
 * (z.B. verhindert einfache XSS-Angriffe)
 * @param {string} input
 * @returns {string}
 */
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(input.trim()));
    return div.innerHTML;
}

/**
 * Prüft, ob der Bahnhofname gültig ist
 * Nur Buchstaben, Leerzeichen und Bindestriche erlaubt
 * @param {string} input
 * @returns {boolean}
 */
function isValidStationName(input) {
    return /^[A-Za-zÄÖÜäöüß\s\-]+$/.test(input);
}