function filter(data) {
    return data.stationboard.map(train => {
        const departure_time = new Date(train.stop.departure)

        const hinweise = [
            train.stop.delay > 0 ? `+${train.stop.delay}'` : '',
            train.stop.prognosis.platform && train.stop.prognosis.platform !== train.stop.platform
                ? `Gleiswechsel: Vom Gleis ${train.stop.platform} zu Gleis ${train.stop.prognosis.platform}`
                : ''
        ].filter(Boolean).join(', ');

        return {
            linie: train.number,
            ziel: train.to,
            gleis: train.stop.platform,
            abfahrtszeit: departure_time.toLocaleTimeString(),
            hinweise: hinweise || ''
        };
    })
}

