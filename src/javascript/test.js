/*
Test für filter.js
*/
const filterTrainData = require('./filter')
const formatTime = require('./filter')
const getLastStop = require('./filter')
const getInfo = require('./filter')

test('formats and maps raw train data', () => {
    let data = [{
            category: "S",
            number: "8",
            to: "Pfäffikon SZ",
            stop: {
                departure: "2023-05-03T19:00:00",
                platform: "4",
                delay: 1
            },
            passList: [
                {station: {name: "Au ZH" } },
                {station: {name: "Wädenswil" } },
                {station: {name: "Richterswil" } },
                {station: {name: "Bäch SZ" } },
                {station: {name: "Freienbach SBB" } },
                {station: {name: "Pfäffikon SZ" }, arrival: "2023-05-03T19:19:00" }
            ]
        }]

    let result = filterTrainData(data);
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('S');
    expect(result[0].line).toBe('S8');
    expect(result[0].destination).toBe('Pfäffikon SZ');
    expect(result[0].departure_time).toMatch(/\d{2}:\d{2}/);
    expect(result[0].arrival_time).toMatch(/\d{2}:\d{2}/);
    expect(result[0].platform).toBe('4');
    expect(result[0].stops).toEqual([
        "Au ZH",
        "Wädenswil",
        "Richterswil",
        "Bäch SZ",
        "Freienbach SBB"
    ]);
    expect(result[0].delay).toBe(1);
    expect(result[0].info).toMatch("Verspätung: +1 Min");
});

test('formats ISO time correctly', () => {
    expect(formatTime('2023-01-01T14:30:00')).toMatch('14:30');
});

test('returns fallback for invalid input', () => {
    expect(formatTime(null)).toBe('Unbekannt');
    expect(formatTime(undefined)).toBe('Unbekannt');
});



test('returns last stop from list', () => {
    const stops = [{arrival: '08:00' }, {arrival: '09:00' }];
    expect(getLastStop(stops)).toEqual({arrival: '09:00' });
});

test('returns null for empty list', () => {
    expect(getLastStop([])).toBeNull();
});


test('returns delay and platform info', () => {
    const train = {
        stop: {delay: 5, platform: '1' },
        prognosis: {platform: '2' }
    };
    expect(getInfo(train)).toMatch(/Verspätung.*Gleiswechsel/);
});

test('returns delay info only', () => {
    const train = {
        stop: {delay: 3, platform: '1' },
        prognosis: {platform: '1' }
    };
    expect(getInfo(train)).toMatch(/Verspätung/);
});

test('returns default info when no issues', () => {
    const train = {
        stop: {delay: 0, platform: '1' },
        prognosis: {platform: '1' }
    };
    expect(getInfo(train)).toBe('Keine besonderen Hinweise');
});

