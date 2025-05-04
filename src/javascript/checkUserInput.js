let timeout;
const menuToggle = document.getElementById('menu-toggle');

/** 
 * Zeigt das Burger-Menü kurzzeitig an und blendet es nach Timeout wieder aus. 
 */
function showMenu() {
    // Zeige das Element
    menuToggle.style.display = 'flex';

    // Setze den Timer zurück
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        menuToggle.style.display = 'none';
    }, 5000);
}

// Event-Listener für Mausbewegung und Tastendruck
document.addEventListener('mousemove', showMenu);
document.addEventListener('keydown', showMenu);