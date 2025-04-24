// Filtert und formatiert die Zugdaten
const filter = (data) => {
    return data.map((train) => {
        return {
            category: train.category || "Unbekannt",
            line: `${train.category}${train.number}`,
            destination: train.to || "Unbekannt",
            departure_time: formatTime(train.stop.departure),
            arrival_time: formatTime(getLastStop(train.passList)?.arrival),
            platform: train.stop.platform || "Unbekannt",
            stops: train.passList
                .map((stop) => stop.station.name)
                .filter(Boolean)
                .slice(0, -1),
            delay: train.stop.delay || 0,
            info: getInfo(train)
        };
    });
};

// Formatiert Zeitangaben im HH:MM-Format
const formatTime = (dateString) => {
    if (!dateString) return "Unbekannt";
    const date = new Date(dateString);
    return date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });;
};

// Gibt den letzten Halt in der Liste zurück
const getLastStop = (passList) => {
    return passList.length > 0 ? passList[passList.length - 1] : null;
};

// Erstellt Info-Text basierend auf Verspätung und Gleiswechsel
const getInfo = (train) => {
    const info = [];

    if (train.stop.delay > 0) {
        info.push(`Verspätung: +${train.stop.delay} Min`);
    }

    if (
        train.prognosis &&
        train.prognosis.platform &&
        train.prognosis.platform !== train.stop.platform
    ) {
        info.push(`Gleiswechsel: ${train.stop.platform} → ${train.prognosis.platform}`);
    }

    return info.length > 0 ? info.join(", ") : "Keine besonderen Hinweise";
};
