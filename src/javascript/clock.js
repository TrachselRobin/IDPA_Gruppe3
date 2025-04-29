/**
 * Initalisiert die Uhr
 * @param {string} elementId - ID des HTML-Elements, in dem die Uhr angezeigt wird.
 * @param {boolean} showSeconds - Ob die Uhr keinen Rand zeigen soll.
 * @param {number} refreshInterval - Intervall in Sekunden, in dem die Uhr aktualisiert wird.
 */
let myClock = new sbbUhr("header-clock", false, 30);

myClock.start()