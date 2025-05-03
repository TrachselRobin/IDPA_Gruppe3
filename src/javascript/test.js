const {expect} = require('@jest/globals')
const {test} = require('@jest/globals');

/**
 * @jest-environment jsdom
 */
/*
Test für filter.js

- TODO: FilterTrainData,formatTime anpassen (ERROR wegen .map und delay undefined)
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
-TODO: ggf FirstWord test
*/


const getPosition = require('./geoposition')
const getStation = require('./geoposition')

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
    const fakeResponse = {
        stations: [
            {name: "Lausanne", icon: "train" }
        ]
    };

    fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(fakeResponse)
    });

    getStation({ latitude: 46.23248, longitude: 10.14268 }).then(result => {
        expect(result).toBe('Lausanne');
    });
});

test('rejects on fetch error', () => {
    fetch.mockRejectedValueOnce(new Error('api down'));
    expect(getStation({ latitude: 0, longitude: 0 })).rejects.toThrow('api down');
});


/*
Tests für settings.js
TODO: Ist es für diese Funktionen in settings.js nötig, tests zu schreiben? -->checkup
 */


/*
Tests für visualize.js
TODO: ggf. test wenn response ist ok aber ist überfl. --> checkup
 */

const sendRequest = require('./request');
const fetchData = require('./request');
global.fetch = jest.fn();

test('should throw error when response is not OK', () => {
        fetch.mockResolvedValue({
            ok: false,
            statusText: 'Not Found'

        });
        expect(fetchData('https://transport.opendata.ch/v1')).rejects.toThrow("Netzwerkantwort war nicht ok: Not Found");
});


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
