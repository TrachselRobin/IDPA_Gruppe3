const stationInput = document.getElementById("station-input");

stationInput.value = station;

stationInput.addEventListener("change", () => {
    station = stationInput.value;
    reloadData();
})