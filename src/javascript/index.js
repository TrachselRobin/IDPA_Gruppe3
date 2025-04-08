// best practices beachten
const BASE_URL = "http://transport.opendata.ch/v1/"
const STATION  = "Horgen" // anpassbar (vielleicht Cookies); geoposition abfrage

const INTERVAL = 30000
const LIMIT    = 3

const test_data = [
    {
        "category": "S",
        "line": "S8",
        "destination": "Pfäffikon SZ",
        "departure_time": "19:00",
        "arrival_time": "19:19",
        "platform": "4",
        "stops": [
            "Au ZH",
            "Wädenswil",
            "Richterswil",
            "Bäch SZ",
            "Freienbach SBB",
            "Pfäffikon SZ"
        ],
        "delay": 1,
        "info": "Verspätung: +1 Min"
    },
    {
        "category": "S",
        "line": "S8",
        "destination": "Winterthur",
        "departure_time": "19:00",
        "arrival_time": "19:49",
        "platform": "3",
        "stops": [
            "Oberrieden",
            "Thalwil",
            "Rüschlikon",
            "Kilchberg ZH",
            "Zürich Wollishofen",
            "Zürich Enge",
            "Zürich Wiedikon",
            "Zürich HB",
            "Zürich Oerlikon",
            "Wallisellen",
            "Dietlikon",
            "Effretikon",
            "Winterthur"
        ],
        "delay": 0,
        "info": "Keine besonderen Hinweise"
    },
    {
        "category": "S",
        "line": "S2",
        "destination": "Ziegelbrücke",
        "departure_time": "19:05",
        "arrival_time": "19:44",
        "platform": "4",
        "stops": [
            "Wädenswil",
            "Richterswil",
            "Pfäffikon SZ",
            "Altendorf",
            "Lachen SZ",
            "Siebnen-Wangen",
            "Schübelbach-Buttikon",
            "Reichenburg",
            "Ziegelbrücke"
        ],
        "delay": 1,
        "info": "Verspätung: +1 Min"
    }
]

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
