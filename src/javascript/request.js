/** Sendet eine API-Anfrage und gibt die ersten Verbindungen zurück. 
 * @param {string} baseUrl - Basis-URL. 
 * @param {string} endpoint - Endpunkt. 
 * @param {Array} options - Optionen als Array. 
 * @returns {Promise<Array>} Antwortdaten. 
 */
const sendRequest = async (baseUrl, endpoint, options) => {
    const optionsString = options.join("&");
    const url = `${baseUrl}${endpoint}?${optionsString}`;

    try {
        const data = await fetchData(url);
        return data.stationboard.slice(0, 3);
    } catch (error) {
        console.error("Fehler bei der Anfrage:", error);
        throw error;
    }
};

/** 
 * Führt einen Fetch aus und verarbeitet JSON. 
 * @param {string} url - Die abzurufende URL. 
 * @returns {Promise<object>} Antwort als Objekt. 
 */
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            new Error(`Netzwerkantwort war nicht ok: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fehler bei der Anfrage:", error);
        throw error;
    }
};

/**
 * Exportiert die Funktionen für den Test.
 */
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { sendRequest, fetchData };
}