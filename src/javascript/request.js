// sendet eine Anfrage und gibt die ersten 3 Ergebnisse der Stationboard zurück
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

// führt einen Fetch durch und gibt die JSON-Antwort zurück
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Netzwerkantwort war nicht ok: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fehler bei der Anfrage:", error);
        throw error;
    }
};
