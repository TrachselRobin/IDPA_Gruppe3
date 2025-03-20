const BASE_URL = "https://transport.opendata.ch/v2"
const STATION  = "HORGEN"

const INTERVAL = 1000 

function reload_data() {
    /*
    Intervall:
    1. Anfrage senden
    2. Daten filtern, nur wichtige Daten (Linie, Ziel, Gleis, Abfahrtszeit, Hinweise wie Verspätungen etc.)
    3. Gefilterte Daten anzeigen
    */
}

function main() {
    setInterval(reload_data, INTERVAL)
}

main()