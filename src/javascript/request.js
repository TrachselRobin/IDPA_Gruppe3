async function send_request(base_url, endpoint, options) {
    const options_string = options.join("&");
    const url = base_url + endpoint + "?" + options_string;

    try {
        const data = await fetchData(url);
        console.log("REQUEST: request server on", data);
        return data;
    } catch (error) {
        console.error("Fehler bei der Anfrage:", error);
        throw error;
    }
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Netzwerkantwort war nicht ok: " + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("Fehler bei der Anfrage:", error);
        throw error;
    }
}
