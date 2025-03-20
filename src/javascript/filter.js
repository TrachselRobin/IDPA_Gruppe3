function filter(data) {
    return data.stationboard.map(train => {
        const departure_time = new Date(train.stop.departure)
        const abfahrtszeit = departure_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const hinweise = [
            train.stop.delay > 0 ? `+${train.stop.delay}'` : '',
            train.stop.prognosis.platform && train.stop.prognosis.platform !== train.stop.platform
                ? `Gleiswechsel: Vom Gleis ${train.stop.platform} zu Gleis ${train.stop.prognosis.platform}`
                : ''
        ].filter(Boolean).join(', ');

        return {
            linie: `${train.category}${train.number}`,
            ziel: train.to,
            gleis: train.stop.platform,
            abfahrtszeit: abfahrtszeit,
            hinweise: hinweise || ''
        }
    })
}

