// Startet die Scrollanimation nach kurzer Wartezeit
const startScrollAnimation = async () => {
    const waitTime = 5000;
    const interval = 30000;
    const availableTime = interval - waitTime;
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

    const timePerDot = duration / mostStops;
    const containers = document.getElementsByClassName("connection-bottom-center");

    await scrollToEnd(containers, timePerDot);
};

// Führt die eigentliche Scrollbewegung durch
const scrollToEnd = async (elementList, timePerDot) => {
    const containers = Array.from(elementList);
    const smoothness = 30;

    const maxScroll = Math.max(...containers.map(el => el.scrollWidth - el.clientWidth));
    const maxStops = Math.max(...containers.map(el => el.querySelectorAll(".punkt").length));
    const steps = (maxStops + 3) * smoothness;

    if (steps <= 0) return;

    const stepSize = maxScroll / steps;
    const delay = (timePerDot * 0.5) / smoothness;

    for (let step = 0; step < steps; step++) {
        containers.forEach(container => {
            const scrollMax = container.scrollWidth - container.clientWidth;
            container.scrollLeft = Math.min(container.scrollLeft + stepSize, scrollMax);
        });

        await sleep(delay);
    }
};