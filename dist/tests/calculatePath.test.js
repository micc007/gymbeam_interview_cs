"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const calculatePath_1 = require("../functions/calculatePath");
(0, vitest_1.it)('calculates shortest path when picking all required products', () => {
    const startX = 0;
    const startY = 0;
    const startZ = 0;
    const input = [
        {
            "positionId": "position-31",
            "x": 3,
            "y": 1,
            "z": 0,
            "productId": "product-1",
            "quantity": 13
        },
        {
            "positionId": "position-449",
            "x": 87,
            "y": 7,
            "z": 100,
            "productId": "product-1",
            "quantity": 4
        },
        {
            "positionId": "position-404",
            "x": 42,
            "y": 6,
            "z": 100,
            "productId": "product-1",
            "quantity": 16
        },
        {
            "positionId": "position-282",
            "x": 36,
            "y": 0,
            "z": 100,
            "productId": "product-1",
            "quantity": 12
        },
        {
            "positionId": "position-458",
            "x": 24,
            "y": 10,
            "z": 100,
            "productId": "product-1",
            "quantity": 10
        },
        {
            "positionId": "position-175",
            "x": 75,
            "y": 7,
            "z": 0,
            "productId": "product-1",
            "quantity": 9
        },
        {
            "positionId": "position-397",
            "x": 21,
            "y": 6,
            "z": 100,
            "productId": "product-1",
            "quantity": 6
        },
        {
            "positionId": "position-241",
            "x": 3,
            "y": 12,
            "z": 0,
            "productId": "product-2",
            "quantity": 12
        },
        {
            "positionId": "position-245",
            "x": 15,
            "y": 12,
            "z": 0,
            "productId": "product-2",
            "quantity": 5
        },
        {
            "positionId": "position-234",
            "x": 72,
            "y": 11,
            "z": 0,
            "productId": "product-2",
            "quantity": 12
        }
    ];
    const correctValue = {
        pickingOrder: [
            {
                productId: "product-1",
                positionId: "position-31"
            },
            {
                productId: "product-2",
                positionId: "position-241"
            }
        ],
        distance: 15
    };
    const result = (0, calculatePath_1.calculatePath)(input, startX, startY, startZ);
    (0, vitest_1.expect)(result).toMatchObject(correctValue);
});
