const {expect} = require('@jest/globals')
const {test} = require('@jest/globals');

/**
 * @jest-environment jsdom
 */

/*
Test für filter.js
Diese Files enthalten keine Funktionen. Tests sind nur für die Kontrolle/Überprüfung des Programmsablauf.
*/
const getInfo = require('./filter')
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


/*
Test für geoposition.js
*/
const { getFirstWord, getPosition, getStation } = require('./geoposition');

global.fetch = jest.fn();
global.navigator = {
    geolocation: {
        getCurrentPosition: jest.fn()
    }
};

test('resolves with actual position if available', async () => {
    const mockPosition = {
        coords: {latitude: 46.23248, longitude: 10.14268 }
    };
    navigator.geolocation.getCurrentPosition.mockImplementationOnce((success) =>
        success(mockPosition)
    );

    const result = await getPosition();
    expect(result).toEqual({
        latitude: 46.23248,
        longitude: 10.14268
    });
});

test('resolves with default position on error', async () => {
    navigator.geolocation.getCurrentPosition.mockImplementationOnce((_, error) =>
        error(new Error('Permission denied'))
    );
    const result = await getPosition();
    expect(result).toEqual({latitude: 0, longitude: 0 });
});

test('returns station name if stations exist', () => {
    getStation({ latitude: 46.23248, longitude: 10.14268 }).then(result => {
        expect(result).toBe('Lausanne');
    });
});

test('rejects on fetch error', () => {
    fetch.mockRejectedValueOnce(new Error('api down'));
    expect(getStation({ latitude: 0, longitude: 0 })).rejects.toThrow('api down');
});
test('returns first word of a normal string', () => {
    expect(getFirstWord("Zürich HB")).toBe("Zürich");
});

test('removes trailing comma from first word', () => {
    expect(getFirstWord("Bern, Hauptbahnhof")).toBe("Bern");
});

test('trims leading/trailing spaces and returns first word', () => {
    expect(getFirstWord("   Basel Badischer Bahnhof")).toBe("Basel");
});

test('returns null for empty string', () => {
    expect(getFirstWord("")).toBeNull();
});

test('returns null for null input', () => {
    expect(getFirstWord(null)).toBeNull();
});

test('returns full word if only one word', () => {
    expect(getFirstWord("Luzern")).toBe("Luzern");
});

/*
Tests für settings.js
TODO: Ist es für diese Funktionen in settings.js nötig, tests zu schreiben? -->checkup
 */


/*
Tests für request.js
Diese Files enthalten keine Funktionen. Tests sind nur für die Kontrolle/Überprüfung des Programmsablauf.
 */
const sendRequest = require('./request');
global.fetch = jest.fn();


test('should return first 3 stationboard entries', async () => {
    const mockResponse = {
        stationboard: [
            { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }
        ]};
    fetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await sendRequest("https://transport.opendata.ch/v1", "/stationboard", ["station=Horgen", "limit=3"]);
    expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    expect(fetch).toHaveBeenCalledWith("https://transport.opendata.ch/v1/stationboard?station=Horgen&limit=3");
});

test('should throw and log error on failure', async () => {
    fetch.mockRejectedValue(new Error("Connection failed"));
    await expect(sendRequest("https://transport.opendata.ch/v1", "/halli", ["galli"])).rejects.toThrow("Connection failed");
});
