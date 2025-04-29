/** 
 * Startet die Scrollanimation nach einer Wartezeit. 
 */
const startScrollAnimation = async () => {
    const waitTime = 5_000;
    const interval = INTERVAL;
    const availableTime = interval - (waitTime * 2);
    const containers = Array.from(document.getElementsByClassName("connection-bottom-center"));

    containers.forEach(container => container.scrollLeft = 0);

    await sleep(waitTime);
    await scroll(availableTime);
};

/** 
 * Ermittelt die maximale Anzahl an Stopps unter den Verbindungen. 
 * @returns {number} Maximale Anzahl Stopps. 
 */
const getMostStops = () => {
    const elements = Array.from(document.getElementsByClassName("connection-bottom-center")).slice(0, 3);
    return elements.reduce((max, el) => {
        const count = el.getElementsByClassName("punkt").length;
        return Math.max(max, count);
    }, 0);
};

/** 
 * Wartet für eine bestimmte Zeitspanne. 
 * @param {number} ms - Zeit in Millisekunden. 
 * @returns {Promise} Promise, das nach Ablauf auflöst. 
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/** 
 * Scrollt alle Verbindungen synchron bis zum Ende. 
 * @param {number} duration - Scroll-Dauer in Millisekunden. 
 */
const scroll = async (duration) => {
    const mostStops = getMostStops();
    if (mostStops === 0) return;

    const containers = document.getElementsByClassName("connection-bottom-center");

    await scrollToEnd(containers, duration);
};

/** 
 * Führt die eigentliche Scrollbewegung auf Elementen aus. 
 * @param {HTMLCollection} elementList - Liste der scrollbaren Container. 
 * @param {number} duration - Scroll-Dauer in Millisekunden. 
 */
const scrollToEnd = async (elementList, duration) => {
    const containers = Array.from(elementList);
    const element = document.querySelector('.connection-bottom-center');
    const width = element ? element.offsetWidth : 0;

    const steps = Math.max(...containers.map(el => el.scrollWidth)) - width;

    if (steps <= 0) return;

    const delay = duration / steps;

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