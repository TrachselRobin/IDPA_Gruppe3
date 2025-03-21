const BASE_URL = "http://transport.opendata.ch/v1/"
const STATION  = "Horgen"

const INTERVAL = 10000
const LIMIT    = 3

let last_data  = null;

async function reload_data() {
    /*
    Intervall:
    1. Anfrage senden
    2. Daten filtern, nur wichtige Daten 
    3. Gefilterte Daten anzeigen
    */
    const OPTIONS = [
        "station=" + STATION,
        "limit=" + LIMIT
    ]

    const response = await send_request(BASE_URL, "stationboard", OPTIONS)

    const filterd_data = filter(response)

    visualize(filterd_data, last_data)

    last_data = filterd_data
}

function main() {
    // first call of method
    reload_data()

    // second and nth call of method after INTERVAL ms
    setInterval(reload_data, INTERVAL)
}

main()