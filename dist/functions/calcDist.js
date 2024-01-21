"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcDist = void 0;
const calcDist = (curr, arr) => {
    const xRes = Number(Math.pow((Number(curr.x) - Number(arr.x)), 2));
    const yRes = Number(Math.pow((Number(curr.y) - Number(arr.y)), 2));
    const zRes = Number(Math.pow((Number(curr.z) - Number(arr.z)), 2));
    const result = Number(Math.sqrt(xRes + yRes + zRes));
    return result;
};
exports.calcDist = calcDist;
