function visualize(filtered_data, last_data) {
    console.log(filtered_data)

    // Finde neue Daten, die nicht in last_data enthalten sind
    let new_data = filtered_data.filter(newItem =>
        !last_data || !last_data.some(oldItem =>
            oldItem.line === newItem.line &&
            oldItem.destination === newItem.destination &&
            oldItem.departure_time === newItem.departure_time &&
            oldItem.arrival_time === newItem.arrival_time
        )
    );

    let container = document.getElementById("connections");
    if (!container) {
        console.error("Container mit ID 'connections' nicht gefunden!");
        return;
    }

    // **Schritt 1: Neue Elemente hinzufügen**
    new_data.forEach(data => {
        let connectionElement = make_connection_element(
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

    adjustAbsoluteElement();

    container.scrollTop = container.scrollHeight;

    // Nach dem Scrollen die obersten Elemente entfernen
    setTimeout(() => {
        while (container.children.length > 3) {
            container.removeChild(container.firstChild);
        }
    }, 500);
}

// Funktion zum Erstellen eines Verbindungselements mit allen Infos
function make_connection_element(category, line, destination, departure, arrival, platform, stops, delay, info) {
    let connection = document.createElement("div");
    connection.classList.add("connection");

    // top section
    let categoryEl = document.createElement("img")
    categoryEl.src = get_category_image(category)
    categoryEl.classList.add("connection-category")

    let lineEl = document.createElement("img")
    lineEl.src = get_line_image(line)
    lineEl.classList.add("connection-line")

    let destinationEl = document.createElement("p")
    destinationEl.innerText = destination
    destinationEl.classList.add("connection-destination")

    let connection_top = document.createElement("section")
    connection_top.classList.add("connection-top")
    connection_top.append(categoryEl, lineEl, destinationEl)

    // bottom section left
    let departureEl = document.createElement("p")
    departureEl.innerText = departure
    departureEl.classList.add("connection-departure")

    let platformEl = document.createElement("p")
    platformEl.innerText = "Gl. " + platform
    platformEl.classList.add("connection-platform")

    let connection_bottom_left = document.createElement("section")
    connection_bottom_left.classList.add("connection-bottom-left")
    connection_bottom_left.append(departureEl, platformEl)

    // bottom section left
    let arrivalEl = document.createElement("p")
    arrivalEl.innerText = arrival
    arrivalEl.classList.add("connection-arrival")

    let delayEl = document.createElement("p")
    delayEl.innerText = convertDelay(delay)
    delayEl.classList.add("connection-delay")

    let infoEl = document.createElement("p")
    infoEl.innerText = "info" // info
    infoEl.classList.add("connection-info")

    let connection_bottom_right = document.createElement("section")
    connection_bottom_right.classList.add("connection-bottom-right")
    connection_bottom_right.append(arrivalEl, delayEl, infoEl)

    // bottom section center

    let connection_bottom_center = document.createElement("section")
    connection_bottom_center.classList.add("connection-bottom-center")

    let linie = document.createElement("span")
    linie.classList.add("linie")
    
    let punkt_start = document.createElement("div")
    punkt_start.classList.add("punkt")
    punkt_start.style.backgroundColor = "black"

    connection_bottom_center.append(linie, punkt_start)

    stops.forEach(stop => {
        let punkt = document.createElement("div")
        punkt.classList.add("punkt")
        punkt.style.setProperty('--after-content', `"${stop}"`);

        connection_bottom_center.append(punkt)
    })

    let punkt_end = document.createElement("div")
    punkt_end.classList.add("punkt")
    punkt_end.style.backgroundColor = "black"

    if(stops.length < 5) {
        punkt_end.style.marginLeft = "auto";
    }

    connection_bottom_center.append(punkt_end)
    
    let connection_bottom = document.createElement("section")
    connection_bottom.classList.add("connection-bottom")
    connection_bottom.append(connection_bottom_left, connection_bottom_center, connection_bottom_right)

    connection.append(connection_top, connection_bottom);
    return connection;
}

function get_category_image(name) {
    const BASE_PATH = "./images/Verkehrsmittel/"

    const FILE_PATH = BASE_PATH + name + ".svg"

    return FILE_PATH
}

function get_line_image(name) {
    const BASE_PATH = "./images/S-Bahnen/"

    const FILE_PATH = BASE_PATH + name.replace(/^S(\d+)$/, "s-$1.svg");

    return FILE_PATH
}

function convertDelay(delay) {
    if (delay == "0") {
        return ""
    }

    return "+" + delay + "'"
}

function adjustAbsoluteElement() {
    var responsiveElem = document.querySelector('.connection-bottom-center');
    var absoluteElements = document.getElementsByClassName('linie');
    if (responsiveElem && absoluteElements) {

        for (var i = 0; i < absoluteElements.length; i++) {
            var element = absoluteElements[i];
            var rect = responsiveElem.getBoundingClientRect();
            element.style.width = rect.width + 'px';
        }
    }
}
