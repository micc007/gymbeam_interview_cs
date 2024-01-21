import { productData, orderItem, outputData } from "../types/types";
import { calcDist } from "./calcDist";

export const calculatePath = (inputData: productData[], startX: number = 0, startY: number = 0, startZ: number = 0): outputData => {

    let lowestDist: number = 0; // lowest distance to the next product
    let finalDist: number = 0; // final distance when every product was selected
    let result: number = 0; // result of the distance calculation between 2 positions
    let nextProductId: string = "";
    let nextPositionId: string = "";
    let filteredData: productData[] = inputData; // array that will be reduced with each iteration of while loop
    let output: orderItem[] = [];
    
    let currItem: productData = {
        positionId: "",
        x: startX, 
        y: startY, 
        z: startZ,
        productId: "",
        quantity: 0
    };

    while(filteredData.length > 0) {
    
        for(let i: number = 0; i < filteredData.length; i++){

            // distance = √{(x2−x1)2+(y2−y1)2+(z2−z1)2}
            result = calcDist(currItem, filteredData[i]);

            // if condition is true, set new lowestDist and save productId/positionId
            if((lowestDist > result) || (i === 0)){
                lowestDist = result;
                nextProductId = filteredData[i].productId;
                nextPositionId = filteredData[i].positionId; 
            }
        }

        finalDist += lowestDist;
        lowestDist = 0;
    
        // set the next currItem based on saved productId and positionId
        let candidate: productData = filteredData.find((item) => (item.productId === nextProductId) && (item.positionId === nextPositionId)) as productData;
        currItem = {
            positionId: candidate.positionId,
            x: candidate.x,
            y: candidate.y,
            z: candidate.z,
            productId: candidate.productId,
            quantity: candidate.quantity
        }
        
        // push current closest item to output array
        let outputItem: orderItem = {
            "productId": currItem.productId,
            "positionId": currItem.positionId
        };
        output.push(outputItem);

        // remove all positions of the selected product
        filteredData = filteredData.filter((item) => item.productId !== nextProductId);
   
    }

    const finalOutput: outputData = {
        "pickingOrder": output,
        "distance": Math.ceil(finalDist)
    };

    return finalOutput;

}