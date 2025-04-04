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

    setTimeout(() => {
        container.scrollTop = container.scrollHeight;

        // Nach dem Scrollen die obersten Elemente entfernen
        setTimeout(() => {
            while (container.children.length > 3) {
                container.removeChild(container.firstChild);
            }
        }, 650); // Leichte Verzögerung für das Scrollen
    }, 200);
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

    //stops
    let stopsEl = document.createElement("div");
    stopsEl.classList.add("connection-stops");

    let maxVisibleStops = 3;
    let visibleStops = stops.slice(0, maxVisibleStops);
    let hasMoreStops = stops.length > maxVisibleStops;

    visibleStops.forEach((stop, index) => {
        if (index > 0) {
            let stopLine = document.createElement("div");
            stopLine.classList.add("stop-line");
            stopsEl.appendChild(stopLine);
        }

        let stopContainer = document.createElement("div");
        stopContainer.classList.add("stop-container");

        let stopPoint = document.createElement("div");
        stopPoint.classList.add("stop-point");

        let stopName = document.createElement("p");
        stopName.innerText = stop;
        stopName.classList.add("stop-name");

        stopContainer.appendChild(stopPoint);
        stopContainer.appendChild(stopName);
        stopsEl.appendChild(stopContainer);
    });

    if (hasMoreStops) {
        let moreContainer = document.createElement("div");
        moreContainer.classList.add("stop-container");

        let stopPoint = document.createElement("div");
        stopPoint.classList.add("stop-point", "more-point");

        let stopName = document.createElement("p");
        stopName.innerText = "...";
        stopName.classList.add("stop-name");

        moreContainer.appendChild(stopPoint);
        moreContainer.appendChild(stopName);
        stopsEl.appendChild(moreContainer);
    }


    let connection_bottom_center = document.createElement("section")
    connection_bottom_center.classList.add("connection-bottom-center")
    connection_bottom_center.append(stopsEl)
    /*
    let stopsEl = createElement("Zwischenstopps", stops.length > 0 ? stops.join(", ") : "Keine");
    */
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