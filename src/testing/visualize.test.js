/**
 * @file visualize.test.js
 * @description Testet ausgewählte Funktionen aus visualize.js
 */

const { getCategoryImage, getLineImage, convertDelay, convertInfo, isCategory } = require("../javascript/visualize.js");

describe("getCategoryImage", () => {
    it("should return the correct image path for bus category", () => {
        const result = getCategoryImage("b");
        expect(result).toBe("./images/Verkehrsmittel/Bus.svg");
    });

    it("should return the correct image path for tram category", () => {
        const result = getCategoryImage("t");
        expect(result).toBe("./images/Verkehrsmittel/Tram.svg");
    });

    it("should return the correct image path for train category", () => {
        const result = getCategoryImage("s");
        expect(result).toBe("./images/Verkehrsmittel/S.svg");
    });

    it("should return the default image path for unknown category", () => {
        const result = getCategoryImage("unknown");
        expect(result).toBe("./images/Verkehrsmittel/default.svg");
    });
});

describe("getLineImage", () => {
    it("should return the correct image path for line 1", () => {
        const result = getLineImage("line1");
        expect(result).toBe("./images/Linie/line-1.svg");
    });

    it("should return the correct image path for line 2", () => {
        const result = getLineImage("line2");
        expect(result).toBe("./images/Linie/line-2.svg");
    });

    it("should return the default image path for unknown line", () => {
        const result = getLineImage("unknown");
        expect(result).toBe("./images/Linie/default.svg");
    });
});

describe("convertDelay", () => {
    it("should return an empty string for 0 delay", () => {
        const result = convertDelay(0);
        expect(result).toBe("");
    });

    it("should return the correct format for positive delay", () => {
        const result = convertDelay(5);
        expect(result).toBe("+5'");
    });

    it("should return the correct format for negative delay", () => {
        const result = convertDelay(-3);
        expect(result).toBe("+-3'");
    });
});

describe("convertInfo", () => {
    it("should return an empty string for 'Keine besonderen Hinweise'", () => {
        const result = convertInfo("Keine besonderen Hinweise");
        expect(result).toBe("");
    });

    it("should return an empty string for 'Verspätung:'", () => {
        const result = convertInfo("Verspätung: 5 Minuten");
        expect(result).toBe("");
    });

    it("should return the info text for other cases", () => {
        const result = convertInfo("Some other info");
        expect(result).toBe("Some other info");
    });
});

describe("isCategory", () => {
    it("should return true for valid categories", () => {
        expect(isCategory("b")).toBe(true);
        expect(isCategory("t")).toBe(true);
        expect(isCategory("ec")).toBe(true);
        expect(isCategory("ic")).toBe(true);
        expect(isCategory("rjx")).toBe(true);
    });

    it("should return false for invalid categories", () => {
        expect(isCategory("invalid")).toBe(false);
        expect(isCategory("")).toBe(false);
        expect(isCategory(null)).toBe(false);
    });
});