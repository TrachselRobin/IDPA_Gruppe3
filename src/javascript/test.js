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

test('rejects on fetch error', async () => {
    fetch.mockRejectedValueOnce(new Error('api down'));
    expect(getStation({ latitude: 0, longitude: 0 })).rejects.toThrow('api down');
});
