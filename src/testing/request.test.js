/**
 * @file request.test.js
 * @description Testet ausgewählte Funktionen aus request.js
 */

const { sendRequest, fetchData } = require('../javascript/request.js');

describe('fetchData()', () => {
    /**
     * Testet die Funktion mit einer gültigen URL.
     */
    it('gibt ein Objekt zurück', async () => {
        const url = 'https://transport.opendata.ch/v1/';
        const result = await fetchData(url);
        expect(typeof result).toBe('object');
    });

    /**
     * Testet die Funktion mit einer ungültigen URL.
     */
    it('wirft einen Fehler bei ungültiger URL', async () => {
        const url = 'invalid_url';
        await expect(fetchData(url)).rejects.toThrow();
    });
});

describe('sendRequest()', () => {
    /**
     * Testet die Funktion mit einer gültigen URL und Optionen.
     */
    it('gibt die ersten 3 Verbindungen zurück', async () => {
        const baseUrl = 'https://transport.opendata.ch/v1/';
        const endpoint = 'stationboard';
        const options = ['station=Zürich'];

        const result = await sendRequest(baseUrl, endpoint, options);
        expect(result.length).toBe(3);
    });

    /**
     * Testet die Funktion mit ungültigen Parametern.
     */
    it('wirft einen Fehler bei ungültiger URL', async () => {
        const baseUrl = 'invalid_url';
        const endpoint = '/stationboard';
        const options = ['station=Zürich', 'dateTime=2025-05-04T14:23:00+02:00'];

        await expect(sendRequest(baseUrl, endpoint, options)).rejects.toThrow();
    });
});