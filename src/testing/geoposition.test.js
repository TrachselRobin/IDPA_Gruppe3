/**
 * @file geoposition.test.js
 * @description Testet ausgewählte Funktionen aus geoposition.js
 */

const { getFirstWord } = require('../javascript/geoposition.js');

describe('getFirstWord()', () => {
    /**
     * Testet die Funktion mit einem gültigen String.
     */
    it('gibt das erste Wort zurück', () => {
        const input = 'Zürich HB,';
        const result = getFirstWord(input);
        expect(result).toBe('Zürich');
    });

    /**
     * Testet die Funktion mit einem leeren String.
     */
    it('gibt null zurück bei leerem String', () => {
        const input = '';
        const result = getFirstWord(input);
        expect(result).toBe(null);
    });
});