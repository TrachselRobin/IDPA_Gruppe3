const BASE_URL = "http://transport.opendata.ch/v1"
const STATION = "HORGEN"

const INTERVAL = 1000
const LIMIT    = 20

function reload_data() {
    /*
    Intervall:
    1. Anfrage senden
    2. Daten filtern, nur wichtige Daten (Linie, Ziel, Gleis, Abfahrtszeit, Hinweise wie Verspätungen etc.)
    3. Gefilterte Daten anzeigen
    */
    const OPTIONS = [
        "station=" + STATION,
        "limit=" + LIMIT
    ]

    const response     = send_request(BASE_URL, OPTIONS)
    const filterd_data = filter(response)

    visualize(filterd_data)
}

function main() {
    setInterval(reload_data, INTERVAL)
}

main()