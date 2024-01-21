"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const calcDist_1 = require("../functions/calcDist");
(0, vitest_1.it)('calculates distance between two points in 3D system', () => {
    const start = {
        positionId: "",
        x: 0,
        y: 0,
        z: 0,
        productId: "",
        quantity: 0
    };
    const end = {
        positionId: "",
        x: 3,
        y: 12,
        z: 0,
        productId: "",
        quantity: 0
    };
    const result = (0, calcDist_1.calcDist)(start, end);
    (0, vitest_1.expect)(Math.ceil(result)).toBe(13);
});
