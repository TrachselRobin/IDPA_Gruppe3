const startScrollAnimation = async function () {
    const WAITTIME = 5000;
    const AVAILABLETIME = INTERVAL - WAITTIME; // INTERVAL = 30000
    const containers = Array.from(document.getElementsByClassName("connection-bottom-center"));

    
    containers.forEach(container => {
        container.scrollLeft = 0;
    });

    await sleep(WAITTIME);
    await scroll(AVAILABLETIME);
};

function getMostStops() {
    const connectionElements = document.getElementsByClassName("connection-bottom-center");
    let mostStops = 0;

    for (let i = 0; i < Math.min(3, connectionElements.length); i++) {
        let element = connectionElements[i];
        let amountElements = element.getElementsByClassName("punkt").length;

        if (amountElements > mostStops) {
            mostStops = amountElements;
        }
    }

    return mostStops;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scroll(duration) {
    const MOSTSTOPS = getMostStops();
    const TIMEPERDOT = duration / MOSTSTOPS;
    const CONTAINERS = document.getElementsByClassName("connection-bottom-center");

    // alle gleichzeitig mit gleicher Gesamtdauer scrollen
    await scrollToEnd(CONTAINERS, TIMEPERDOT);
}

async function scrollToEnd(elementList, timePerDot) {
    const containers = Array.from(elementList);

    // Determine the maximum scroll distance
    const maxScrollAmount = Math.max(...containers.map(el => el.scrollWidth - el.clientWidth));

    const maxStops = Math.max(...containers.map(el => el.querySelectorAll('.punkt').length));
    const SMOOTHNESS = 100
    const steps = (maxStops + 3) * SMOOTHNESS;

    if (steps <= 0) return;

    const stepSize = maxScrollAmount / steps;

    for (let step = 0; step < steps; step++) {
        containers.forEach(container => {
            const scrollMax = container.scrollWidth - container.clientWidth;
            if (container.scrollLeft + stepSize <= scrollMax) {
                container.scrollLeft += stepSize;
            } else {
                container.scrollLeft = scrollMax; // clamp at the end
            }
        });

        await sleep((timePerDot * 0.5) / SMOOTHNESS);
    }
}