// DOM-Elemente
const loadingScreenEl = document.getElementById("loading-screen");
const titleEl = document.getElementById("header-content-h1");
const trainEl = document.getElementById("header-train");

// Testdaten für Debug/Testzwecke
const testData = [
    {
        category: "S",
        line: "S8",
        destination: "Pfäffikon SZ",
        departure_time: "19:00",
        arrival_time: "19:19",
        platform: "4",
        stops: ["Au ZH", "Wädenswil", "Richterswil", "Bäch SZ", "Freienbach SBB", "Pfäffikon SZ"],
        delay: 1,
        info: "Verspätung: +1 Min"
    },
    {
        category: "S",
        line: "S8",
        destination: "Winterthur",
        departure_time: "19:00",
        arrival_time: "19:49",
        platform: "3",
        stops: [
            "Oberrieden", "Thalwil", "Rüschlikon", "Kilchberg ZH", "Zürich Wollishofen",
            "Zürich Enge", "Zürich Wiedikon", "Zürich HB", "Zürich Oerlikon", "Wallisellen",
            "Dietlikon", "Effretikon", "Winterthur"
        ],
        delay: 0,
        info: "Keine besonderen Hinweise"
    },
    {
        category: "S",
        line: "S2",
        destination: "Ziegelbrücke",
        departure_time: "19:05",
        arrival_time: "19:44",
        platform: "4",
        stops: [
            "Wädenswil", "Richterswil", "Pfäffikon SZ", "Altendorf", "Lachen SZ",
            "Siebnen-Wangen", "Schübelbach-Buttikon", "Reichenburg", "Ziegelbrücke"
        ],
        delay: 1,
        info: "Verspätung: +1 Min"
    }
];

let lastData = null;

/** 
 * Holt aktuelle Verbindungsdaten und aktualisiert die Anzeige. 
 * @param {boolean} showLoading - Gibt an, ob ein Ladebildschirm angezeigt werden soll. 
 */
const reloadData = async (showLoading = false) => {
    try {
        const options = [`station=${station}`, `limit=${LIMIT}`];

        if (showLoading) {
            loadingScreenEl.classList.add("loading");
        }

        const response = await sendRequest(BASE_URL, "stationboard", options);
        const filteredData = filterTrainData(response);

        if (showLoading) {
            loadingScreenEl.classList.remove("loading");
        }

        visualizeConnections(filteredData, lastData);
        lastData = filteredData;

        startScrollAnimation();
    } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
    }
};

/** 
 * Animiert den Zug und aktualisiert den Anzeigetitel zyklisch. 
 */
const loadTitle = async () => {
    const animationTime = 3000;
    const displayTitle = `Abfahrtsbildschirm ${station}`;

    animateTrain(animationTime);
    await sleep(animationTime / 2);
    titleEl.innerText = displayTitle;

    await sleep((INTERVAL_TITLE / 2) - (animationTime / 2));

    animateTrain(animationTime);
    await sleep(animationTime / 2);
    titleEl.innerText = info;
};

/** 
 * Führt eine Animationsbewegung des Zugs aus. 
 * @param {number} time - Dauer der Animation in Millisekunden. 
 */
const animateTrain = async (time) => {
    trainEl.classList.add("train-animation");
    await sleep(time);
    trainEl.classList.remove("train-animation");
};

/** 
 * Startet die Hauptlogik der Applikation. 
 * Ermittelt Standort, lädt Daten und initialisiert Animationen. 
 */
const main = async () => {
    const position = await getPosition();
    station = await getStation(position);

    setStationValue(station);

    await reloadData(true);
    loadTitle();

    setInterval(loadTitle, INTERVAL_TITLE);
    setInterval(reloadData, INTERVAL);
};

// Start der Anwendung
main();