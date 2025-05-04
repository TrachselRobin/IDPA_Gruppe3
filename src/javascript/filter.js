/** 
 * Filtert und formatiert die Rohdaten der Transport-API. 
 * @param {Array} data - Array von rohen Verbindungsdaten. 
 * @returns {Array} Array von gefilterten und formatierten Verbindungen. 
 */
const filterTrainData = (data) => {
    return data.map((train) => {
        return {
            category: train.category || "Unbekannt",
            line: `${train.category}${train.number}`,
            destination: train.to || "Unbekannt",
            departure_time: formatTime(train.stop.departure),
            arrival_time: formatTime(getLastStop(train.passList)?.arrival),
            platform: train.stop.platform || "Unbekannt",
            stops: train.passList
                .map((stop) => stop.station.name)
                .filter(Boolean)
                .slice(0, -1),
            delay: train.stop.delay || 0,
            info: getInfo(train)
        };
    });
};

/** 
 * Wandelt ein ISO-Datum in ein deutsches Zeitformat um. 
 * @param {string} dateString - ISO-Datum. 
 * @returns {string} Zeit im Format HH:MM. 
 */
const formatTime = (dateString) => {
    if (!dateString) return "Unbekannt";
    const date = new Date(dateString);
    return date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

/** 
 * Gibt den letzten Halt aus einer Liste zurück. @param {Array} passList - Liste aller Haltepunkte. 
 * @returns {object|null} Letzter Halt oder null, wenn die Liste leer ist. 
 */
const getLastStop = (passList) => {
    return passList.length > 0 ? passList[passList.length - 1] : null;
};

/** 
 * Generiert Infotext (Verspätung, Gleiswechsel) zu einem Zug. 
 * @param {object} train - Der Zugdatensatz. 
 * @returns {string} Infotext. 
 */
const getInfo = (train) => {
    const info = [];

    if (train.stop.delay > 0) {
        info.push(`Verspätung: +${train.stop.delay} Min`);
    }

    if (
        train.prognosis &&
        train.prognosis.platform &&
        train.prognosis.platform !== train.stop.platform
    ) {
        info.push(`Gleiswechsel: ${train.stop.platform} → ${train.prognosis.platform}`);
    }

    return info.length > 0 ? info.join(", ") : "Keine besonderen Hinweise";
};

/**
 * Exportiert die Funktionen für den Test.
 */
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { formatTime, getInfo };
}