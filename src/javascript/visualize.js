// Visualisiert neue Verbindungen im DOM
const visualize = (filteredData, lastData) => {
    const newData = filteredData.filter((newItem) =>
        !lastData || !lastData.some((oldItem) =>
            oldItem.line === newItem.line &&
            oldItem.destination === newItem.destination &&
            oldItem.departure_time === newItem.departure_time &&
            oldItem.arrival_time === newItem.arrival_time
        )
    );

    const container = document.getElementById("connections");
    container.style.overflowY = "scroll";
    if (!container) {
        console.error("Container mit ID 'connections' nicht gefunden!");
        return;
    }

    // Neue Elemente hinzufügen
    newData.forEach((data) => {
        const connectionElement = makeConnectionElement(
            data.category,
            data.line,
            data.destination,
            data.departure_time,
            data.arrival_time,
            data.platform,
            data.stops,
            data.delay,
            data.info
        );
        container.appendChild(connectionElement);
    });

    container.scrollTop = container.scrollHeight;

    // Alte Elemente entfernen
    setTimeout(() => {
        while (container.children.length > 3) {
            container.removeChild(container.firstChild);
        }
    }, 500);
    
    container.style.overflowY = "hidden";
};

// Erstellt ein Verbindungselement mit allen Infos
const makeConnectionElement = (
    category,
    line,
    destination,
    departure,
    arrival,
    platform,
    stops,
    delay,
    info
) => {
    const connection = document.createElement("div");
    connection.classList.add("connection");

    // Top section
    const categoryEl = document.createElement("img");
    categoryEl.src = getCategoryImage(category);
    categoryEl.classList.add("connection-category");

    const lineEl = document.createElement("img");
    lineEl.src = getLineImage(line);
    lineEl.classList.add("connection-line");

    const destinationEl = document.createElement("p");
    destinationEl.innerText = destination;
    destinationEl.classList.add("connection-destination");

    const connectionTop = document.createElement("section");
    connectionTop.classList.add("connection-top");
    connectionTop.append(categoryEl, lineEl, destinationEl);

    // Bottom left
    const departureEl = document.createElement("p");
    departureEl.innerText = departure;
    departureEl.classList.add("connection-departure");

    const platformEl = document.createElement("p");
    platformEl.innerText = `Gl. ${platform}`;
    platformEl.classList.add("connection-platform");

    const connectionBottomLeft = document.createElement("section");
    connectionBottomLeft.classList.add("connection-bottom-left");
    connectionBottomLeft.append(departureEl, platformEl);

    // Bottom right
    const arrivalEl = document.createElement("p");
    arrivalEl.innerText = arrival;
    arrivalEl.classList.add("connection-arrival");

    const delayEl = document.createElement("p");
    delayEl.innerText = convertDelay(delay);
    delayEl.classList.add("connection-delay");

    const infoEl = document.createElement("p");
    infoEl.innerText = convertInfo(info);
    infoEl.classList.add("connection-info");

    const connectionBottomRight = document.createElement("section");
    connectionBottomRight.classList.add("connection-bottom-right");
    connectionBottomRight.append(arrivalEl, delayEl, infoEl);

    // Bottom center
    const connectionBottomCenter = document.createElement("section");
    connectionBottomCenter.classList.add("connection-bottom-center");

    const linie = document.createElement("span");
    linie.classList.add("linie");
    linie.style.width = `calc(${stops.length} * (10vw + 10px) + 10vw + 20px)`;

    const punktStart = document.createElement("div");
    punktStart.classList.add("punkt");
    punktStart.style.backgroundColor = "black";

    connectionBottomCenter.append(linie, punktStart);

    stops.forEach((stop) => {
        const punkt = document.createElement("div");
        punkt.classList.add("punkt");
        punkt.style.setProperty("--after-content", `"${stop}"`);
        connectionBottomCenter.append(punkt);
    });

    const punktEnd = document.createElement("div");
    punktEnd.classList.add("punkt");
    punktEnd.style.backgroundColor = "black";

    if (stops.length < 5) {
        punktEnd.style.marginLeft = "auto";
    }

    connectionBottomCenter.append(punktEnd);

    const connectionBottom = document.createElement("section");
    connectionBottom.classList.add("connection-bottom");
    connectionBottom.append(connectionBottomLeft, connectionBottomCenter, connectionBottomRight);

    connection.append(connectionTop, connectionBottom);
    return connection;
};

// Liefert Bildpfad zur Kategorie
const getCategoryImage = (name) => {
    const basePath = "./images/Verkehrsmittel/";
    return `${basePath}S.svg`;
};

// Liefert Bildpfad zur Linie
const getLineImage = (name) => {
    const BASE_PATH = "./images/Linie/";

    if (!name) return BASE_PATH + "default.svg";
    const normalized = name.trim().toLowerCase();
    const match = normalized.match(/^([a-z]+)(\d+)$/i);

    if (match) {
        const prefix = match[1];
        const number = match[2];
        return `${BASE_PATH}${prefix}-${number}.svg`;
    } else {
        console.warn(`Unknown line format: "${name}"`);
        return BASE_PATH + "default.svg";
    }
};

// Wandelt Verspätung in Anzeigeformat
const convertDelay = (delay) => {
    return delay == "0" ? "" : `+${delay}'`;
};

const convertInfo = (info) => {
    return info == "Keine besonderen Hinweise" || info.startsWith("Verspätung:") ? "" : info;
}
