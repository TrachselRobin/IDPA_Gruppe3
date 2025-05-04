/**
 * @file filter.test.js
 * @description Testet ausgewählte Funktionen aus filter.js
 */

const { formatTime, getInfo } = require('../javascript/filter.js');

describe('formatTime()', () => {
    /**
     * Testet die Konvertierung eines gültigen ISO-Datumsstrings
     * ins deutsche Uhrzeitformat (HH:MM).
     */
    it('gibt korrekte Uhrzeit bei gültigem ISO-String zurück', () => {
        const input = '2025-05-04T14:23:00+02:00';
        const result = formatTime(input);
        expect(result).toBe('14:23');
    });

    /**
     * Testet das Verhalten bei null oder ungültigem Input.
     */
    it('gibt "Unbekannt" bei fehlendem Datum zurück', () => {
        expect(formatTime(null)).toBe('Unbekannt');
        expect(formatTime(undefined)).toBe('Unbekannt');
    });
});

describe('getInfo()', () => {
    /**
     * Testet die Generierung des Infotextes für einen Zug mit
     * Verspätung und Gleiswechsel.
     */
    it('gibt korrekten Infotext zurück', () => {
        const train = {
            stop: { delay: 5, platform: '1' },
            prognosis: { platform: '2' }
        };
        const result = getInfo(train);
        expect(result).toBe('Verspätung: +5 Min, Gleiswechsel: 1 → 2');
    });

    /**
     * Testet den Fall ohne Verspätung und Gleiswechsel.
     */
    it('gibt "Keine besonderen Hinweise" zurück', () => {
        const train = {
            stop: { delay: 0, platform: '1' },
            prognosis: { platform: '1' }
        };
        const result = getInfo(train);
        expect(result).toBe('Keine besonderen Hinweise');
    });
});