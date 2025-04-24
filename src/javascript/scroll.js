// Startet die Scrollanimation nach kurzer Wartezeit
const startScrollAnimation = async () => {
    const waitTime = 5_000;
    const interval = INTERVAL;
    const availableTime = interval - (waitTime * 2);
    const containers = Array.from(document.getElementsByClassName("connection-bottom-center"));

    containers.forEach(container => container.scrollLeft = 0);

    await sleep(waitTime);
    await scroll(availableTime);
};

// Gibt die maximale Anzahl an Stop-Punkten unter den ersten 3 Verbindungen zurück
const getMostStops = () => {
    const elements = Array.from(document.getElementsByClassName("connection-bottom-center")).slice(0, 3);
    return elements.reduce((max, el) => {
        const count = el.getElementsByClassName("punkt").length;
        return Math.max(max, count);
    }, 0);
};

// Liefert ein Promise, das nach einer bestimmten Zeit auflöst
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Scrollt alle Container synchron basierend auf Anzahl Stopps und verfügbarer Zeit
const scroll = async (duration) => {
    const mostStops = getMostStops();
    if (mostStops === 0) return;

    const containers = document.getElementsByClassName("connection-bottom-center");

    await scrollToEnd(containers, duration);
};

// Führt die eigentliche Scrollbewegung durch
const scrollToEnd = async (elementList, duration) => {
    const containers = Array.from(elementList);
    const element = document.querySelector('.connection-bottom-center');
    const width = element ? element.offsetWidth : 0;

    const steps = Math.max(...containers.map(el => el.scrollWidth)) - width;

    console.log("Width: " + width);
    console.log("Steps: " + steps);

    if (steps <= 0) return;

    const delay = duration / steps;

    console.log("Duration: " + duration);
    console.log("Delay: " + delay);

    for (let step = 0; step < steps; step++) {
        containers.forEach(container => {
            container.scrollLeft += 1;
        });

        if (break_async) {
            return
        }

        await sleep(delay);
    }
};