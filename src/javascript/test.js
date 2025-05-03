/*
Test für filter.js

- TODO: FilterTrainData,formatTime anpassen (ERROR wegen .map und delay undefined)
*/


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