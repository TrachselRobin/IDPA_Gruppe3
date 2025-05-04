/** 
 * Holt die aktuelle Benutzerposition oder Standardkoordinaten. 
 * @returns {Promise<{latitude: number, longitude: number}>} Position. 
 */
function getPosition() {
    return new Promise((resolve) => {
        let userPosition = {
            latitude: 0,
            longitude: 0
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    userPosition.latitude = position.coords.latitude;
                    userPosition.longitude = position.coords.longitude;
                    resolve(userPosition);
                },
                (error) => {
                    console.warn("Geolocation failed, using default:", userPosition);
                    resolve(userPosition);
                }
            );
        } else {
            console.warn("Geolocation not supported, using default:", userPosition);
            resolve(userPosition);
        }
    });
}

/** 
 * Holt anhand der Geoposition den nächstgelegenen Bahnhof. 
 * @param {object} position - Geopositionsdaten. 
 * @returns {Promise<string>} Name des Bahnhofs. 
 */
function getStation(position) {
    return new Promise((resolve, reject) => {
        let lat = position.latitude;
        let lon = position.longitude;
        const url = `https://transport.opendata.ch/v1/locations?x=${lat}&y=${lon}&type=station`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const stations = data.stations || [];

                const trainStations = stations.filter(trainStation =>
                    trainStation.icon != null
                );

                if (trainStations.length > 0) {
                    const name = getFirstWord(trainStations[0].name);
                    resolve(name);
                } else {
                    console.log("Keine Zugstation gefunden.");
                    resolve(station);  // Or some fallback name
                }
            })
            .catch(err => {
                console.error("Fehler bei der API-Abfrage:", err);
                reject(err);
            });
    });
}

/** 
 * Gibt das erste Wort eines Strings zurück. 
 * @param {string} string - Eingabetext. 
 * @returns {string|null} Erstes Wort oder null. 
 */
function getFirstWord(string) {
    if (!string) return null;
    return string.trim().split(/\s+/)[0].replace(/,$/, '');
}

/**
 * Exportiert die Funktionen für den Test.
 */
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { getFirstWord };
}