/** 
 * Startet die Scrollanimation nach einer Wartezeit. 
 */
const startScrollAnimation = async () => {
    const waitTime = 5_000;
    const availableTime = INTERVAL - (waitTime * 2);

    const containers = Array.from(document.getElementsByClassName("connection-bottom-center"));

    containers.forEach(container => container.scrollLeft = 0);

    await sleep(waitTime);
    await scrollConnections(availableTime);
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
const scrollConnections = async (duration) => {
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

    // Berechne die maximale Scrollbreite basierend auf jedem Container
    const maxScrollWidth = Math.max(
        ...containers.map(el => el.scrollWidth - el.clientWidth)
    );

    if (maxScrollWidth <= 0) return;

    const startTime = performance.now(); // Startzeit der Animation
    const interval = 16; // Approx. 60 FPS

    const animateScroll = async () => {
        const elapsedTime = performance.now() - startTime; // Verstrichene Zeit
        const progress = Math.min(elapsedTime / duration, 1); // Fortschritt (0 bis 1)

        const currentScroll = maxScrollWidth * progress; // Aktuelle Scrollposition

        containers.forEach(container => {
            container.scrollLeft = currentScroll;
        });

        if (progress < 1) {
            await sleep(interval);
            await animateScroll(); // Rekursiver Aufruf bis zum Ende
        }
    };

    await animateScroll();
};