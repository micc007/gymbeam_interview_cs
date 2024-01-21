import { it, expect } from 'vitest';

import { calcDist } from "../functions/calcDist";
import { productData } from "../types/types";


it('calculates distance between two points in 3D system', () => {
    const start: productData = {
        positionId: "",
        x: 0,
        y: 0,
        z: 0,
        productId: "",
        quantity: 0
    };

    const end: productData = {
        positionId: "",
        x: 3,
        y: 12,
        z: 0,
        productId: "",
        quantity: 0
    }

    const result = calcDist(start, end);

    expect(Math.ceil(result)).toBe(13)

});