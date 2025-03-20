function filter(data) {
    return data.map(train => {
        return {
            category: train.category || "Unbekannt",
            line: `${train.category}${train.number}`,
            destination: train.to || "Unbekannt",
            departure_time: formatTime(train.stop.departure),
            arrival_time: formatTime(getLastStop(train.passList)?.arrival),
            platform: train.stop.platform || "Unbekannt",
            stops: train.passList.map(stop => stop.station.name).filter(Boolean),
            delay: train.stop.delay || 0,
            info: getInfo(train)
        };
    });
}

// Hilfsfunktion zur Formatierung der Zeit
function formatTime(dateString) {
    if (!dateString) return "Unbekannt";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Hilfsfunktion, um den letzten Halt zu ermitteln
function getLastStop(passList) {
    return passList.length > 0 ? passList[passList.length - 1] : null;
}

// Hilfsfunktion für Verspätung & Hinweise
function getInfo(train) {
    let info = [];
    if (train.stop.delay > 0) {
        info.push(`Verspätung: +${train.stop.delay} Min`);
    }
    if (train.prognosis && train.prognosis.platform && train.prognosis.platform !== train.stop.platform) {
        info.push(`Gleiswechsel: ${train.stop.platform} → ${train.prognosis.platform}`);
    }
    return info.length > 0 ? info.join(", ") : "Keine besonderen Hinweise";
}
