const stationInput = document.getElementById("station-input");
const messageBox = document.getElementById("messages");

setStationValue(station);

function save() {
    station = stationInput.value;
    showMessage("Gespeichert!");
}

function closeModal() {
    modal.close();
}

function setStationValue(value) {
    stationInput.value = value;
}

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