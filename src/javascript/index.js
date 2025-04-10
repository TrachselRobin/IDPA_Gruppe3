const TEST_DATA = [
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
 * Lädt aktuelle Daten vom API-Endpunkt, filtert sie und visualisiert sie.
 */
async function reloadData() {
    try {
        const options = [`station=${station}`, `limit=${LIMIT}`];
        
        const response = await sendRequest(BASE_URL, "stationboard", options);
        const filteredData = filter(response);

        visualize(filteredData, lastData);
        lastData = filteredData;

    } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
    }
}

/**
 * Initialisiert die Anwendung und startet den periodischen Datenabruf.
 */
function main() {
    reloadData(); // Initialer Aufruf
    setInterval(reloadData, INTERVAL); // Wiederholte Aufrufe
}

// Startpunkt der Anwendung
main();