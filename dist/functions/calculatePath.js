"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePath = void 0;
const calcDist_1 = require("./calcDist");
const calculatePath = (inputData, startX = 0, startY = 0, startZ = 0) => {
    let lowestDist = 0; // lowest distance to the next product
    let finalDist = 0; // final distance when every product was selected
    let result = 0; // result of the distance calculation between 2 positions
    let nextProductId = "";
    let nextPositionId = "";
    let filteredData = inputData; // array that will be reduced with each iteration of while loop
    let output = [];
    let currItem = {
        positionId: "",
        x: startX,
        y: startY,
        z: startZ,
        productId: "",
        quantity: 0
    };
    while (filteredData.length > 0) {
        for (let i = 0; i < filteredData.length; i++) {
            // distance = √{(x2−x1)2+(y2−y1)2+(z2−z1)2}
            result = (0, calcDist_1.calcDist)(currItem, filteredData[i]);
            // if condition is true, set new lowestDist and save productId/positionId
            if ((lowestDist > result) || (i === 0)) {
                lowestDist = result;
                nextProductId = filteredData[i].productId;
                nextPositionId = filteredData[i].positionId;
            }
        }
        finalDist += lowestDist;
        lowestDist = 0;
        // set the next currItem based on saved productId and positionId
        let candidate = filteredData.find((item) => (item.productId === nextProductId) && (item.positionId === nextPositionId));
        currItem = {
            positionId: candidate.positionId,
            x: candidate.x,
            y: candidate.y,
            z: candidate.z,
            productId: candidate.productId,
            quantity: candidate.quantity
        };
        // push current closest item to output array
        let outputItem = {
            "productId": currItem.productId,
            "positionId": currItem.positionId
        };
        output.push(outputItem);
        // remove all positions of the selected product
        filteredData = filteredData.filter((item) => item.productId !== nextProductId);
    }
    const finalOutput = {
        "pickingOrder": output,
        "distance": Math.ceil(finalDist)
    };
    return finalOutput;
};
exports.calculatePath = calculatePath;
