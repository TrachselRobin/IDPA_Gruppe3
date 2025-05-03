/** 
 * Visualisiert neue Verbindungen im DOM. 
 * @param {Array} filteredData - Aktuelle Verbindungsdaten. 
 * @param {Array} lastData - Vorherige Verbindungsdaten. 
 */
const visualizeConnections = (filteredData, lastData) => {
    const newData = filteredData.filter(
        (newItem) =>
            !lastData ||
            !lastData.some(
                (oldItem) =>
                    oldItem.line === newItem.line &&
                    oldItem.destination === newItem.destination &&
                    oldItem.departure_time === newItem.departure_time &&
                    oldItem.arrival_time === newItem.arrival_time
            )
    );

    const container = document.getElementById("connections");
    if (!container) {
        console.error("Container mit ID 'connections' nicht gefunden!");
        return;
    }

    container.style.overflowY = "scroll";

    newData.forEach((data) =>{
        const connectionElement = makeConnectionElement(data);
        container.appendChild(connectionElement);
    });

    container.scrollTop = container.scrollHeight;

    const allInfos = filteredData.map((conn) => conn.info);
    info = allInfos.every((text) => text === "Keine besonderen Hinweise")
        ? "Keine besonderen Hinweise"
        : allInfos.some((text) => text.startsWith("Verspätung:"))
            ? "Achtung Verspätungen!"
            : "Verbindung überprüfen!";

    setTimeout(() => {
        while (container.children.length > 3) {
            container.removeChild(container.firstChild);
        }
        container.style.overflowY = "hidden";
    }, 500);
};

/** 
 * Erzeugt ein HTML-Element für eine Zugverbindung. 
 * @param {object} data - Einzelne Verbindungsinformationen. 
 * @returns {HTMLElement} HTML-Element der Verbindung. 
 */
const makeConnectionElement = ({
    category,
    line,
    destination,
    departure_time,
    arrival_time,
    platform,
    stops,
    delay,
    info
}) =>{
    const el = (tag, className, text) => {
        const e = document.createElement(tag);
        if (className) e.classList.add(className);
        if (text !== undefined) e.innerText = text;
        return e;
    };

    const img = (src, className) => {
        const i = document.createElement("img");
        i.src = src;
        i.classList.add(className);
        return i;
    };

    const specialLine = (number) => {
        const busEl = el("p", "connection-line", number);
        busEl.innerText = number;
        return busEl;
    }


    const connection = document.createElement("div");
    connection.classList.add("connection");

    const connectionTop = document.createElement("section");
    connectionTop.classList.add("connection-top");
    connectionTop.append(
        img(getCategoryImage(category), "connection-category"),
        isCategory(category) ? specialLine(line) : img(getLineImage(line), "connection-line"),
        el("p", "connection-destination", destination)
    );

    const connectionBottomLeft = document.createElement("section");
    connectionBottomLeft.classList.add("connection-bottom-left");
    connectionBottomLeft.append(
        el("p", "connection-departure", departure_time),
        el("p", "connection-platform", `Gl. ${platform}`)
    );

    const connectionBottomRight = document.createElement("section");
    connectionBottomRight.classList.add("connection-bottom-right");
    connectionBottomRight.append(
        el("p", "connection-arrival", arrival_time),
        el("p", "connection-delay", convertDelay(delay)),
        el("p", "connection-info", convertInfo(info))
    );

    const connectionBottomCenter = document.createElement("section");
    connectionBottomCenter.classList.add("connection-bottom-center");

    const linie = document.createElement("span");
    linie.classList.add("linie");
    linie.style.width = `calc(${stops.length} * (12vw + 1.35vh) + 12vw + 1.4vh)`;

    const punkt = (color, label) => {
        const p = document.createElement("div");
        p.classList.add("punkt");
        if (color) p.style.backgroundColor = color;
        if (label) p.style.setProperty("--after-content", `"${label}"`);
        return p;
    };

    connectionBottomCenter.append(linie, punkt("black"));
    stops.forEach((stop) => connectionBottomCenter.append(punkt(null, stop)));
    const punktEnd = punkt("black");
    if (stops.length < 4) punktEnd.style.marginLeft = "auto";
    connectionBottomCenter.append(punktEnd);

    const connectionBottom = document.createElement("section");
    connectionBottom.classList.add("connection-bottom");
    connectionBottom.append(connectionBottomLeft, connectionBottomCenter, connectionBottomRight);

    connection.append(connectionTop, connectionBottom);
    return connection;
};

/** 
 * Gibt den Pfad zum Symbolbild für eine Verkehrskategorie zurück. 
 * @param {string} name - Kategoriebezeichnung. 
 * @returns {string} Bildpfad. 
 */
const getCategoryImage = (name) => {
    const basePath = "./images/Verkehrsmittel/";
    if (!name) return `${basePath}default.svg`;

    const normalized = name.trim().toLowerCase();
    const categoryMap = {
        s: "S",
        b: "Bus",
        t: "Tram"
    };

    return categoryMap[normalized] ? `${basePath}${categoryMap[normalized]}.svg` : `${basePath}default.svg`;
}

/** 
 * Gibt den Pfad zum Symbolbild für eine Zuglinie zurück. 
 * @param {string} name - Linienname. 
 * @returns {string} Bildpfad. 
 */
const getLineImage = (name) => {
    const basePath = "./images/Linie/";
    if (!name) return `${basePath}default.svg`;

    const normalized = name.trim().toLowerCase();
    const match = normalized.match(/^([a-z]+)(\d+)$/i);

    return match
        ? `${basePath}${match[1]}-${match[2]}.svg`
        : `${basePath}default.svg`;
};

/** 
 * Formatiert die Verspätung für die Anzeige. 
 * @param {number} delay - Verspätung in Minuten. 
 * @returns {string} Formatierte Verspätung. 
 */
const convertDelay = (delay) => (delay == "0" ? "" : `+${delay}'`);

/** 
 * Gibt Zusatzinfos nur zurück, wenn sie relevant sind. 
 * @param {string} info - Info-Text. 
 * @returns {string} Angezeigter Text oder leer. 
 */
const convertInfo = (info) =>
    info === "Keine besonderen Hinweise" || info.startsWith("Verspätung:") ? "" : info;

const isCategory = (category) => {
    const categories = ["b", "t", "ec", "ic", "rjx"];
    category = category.trim().toLowerCase();
    
    return categories.includes(category);
}

