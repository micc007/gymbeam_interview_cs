import { productData, orderItem, outputData } from "../types/types";

export const calculatePath = (inputData: productData[], startX: number = 0, startY: number = 0, startZ: number = 0): outputData => {

    
    let lowestDist: number = 0; // lowest distance to the next product
    let finalDist: number = 0; // final distance when every product was selected
    let result: number = 0, xRes: number = 0, yRes: number = 0, zRes: number = 0; // vars for calculating distance 
    let nextProductId: string = "";
    let nextPositionId: string = "";
    let filteredData: productData[] = inputData;
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
    
        // console.log(`lowestDist = ${lowestDist}`)
    
        for(let i: number = 0; i < filteredData.length; i++){
            xRes = Number(Math.pow((Number(currItem.x) - Number(filteredData[i].x)),2));
            yRes = Number(Math.pow((Number(currItem.y) - Number(filteredData[i].y)),2));
            zRes = Number(Math.pow((Number(currItem.z) - Number(filteredData[i].z)),2));
            result = Number(Math.sqrt(xRes + yRes + zRes));
            
    
            // console.log(`curr - ${currItem.x},${currItem.y},${currItem.z}`)
            // console.log(`filtered - ${filteredData[i].x},${filteredData[i].y},${filteredData[i].z}`)
            // console.log(`start - ${startX}, ${startY}, ${startZ}`)
    
            // console.log(`result = ${result}`)
            console.log(`currX = ${currItem.x}, currY = ${currItem.y}, currZ = ${currItem.z}`)
            console.log(`fX = ${filteredData[i].x}, fY = ${filteredData[i].y}, fZ = ${filteredData[i].z}`)
            console.log(`xRes = ${xRes}, yRes = ${yRes}, zRes = ${zRes}, lowestDist = ${lowestDist}, result = ${result}`)
            console.log("")
            if((lowestDist > result) || (i === 0)){
                lowestDist = result;
                // console.log(currItem)
                nextProductId = filteredData[i].productId;
                nextPositionId = filteredData[i].positionId; 
            }
        }
        
        console.log(`finalDist before - ${finalDist}`)
        console.log(`lowestDist - ${lowestDist}`)
        finalDist += lowestDist;
        lowestDist = 0;
        console.log(`finalDist after - ${finalDist}`)
    
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
        
        // console.log("filtered length before - " + filteredData.length);
        filteredData = filteredData.filter((item) => item.productId !== nextProductId); // remove all instances of an already picked item
        // console.log("filtered length after - " + filteredData.length);
    
        console.log(currItem)
        
        // console.log(`lowestDist = ${lowestDist}`)
    }
    
    console.log(`finalDist -> ${finalDist}`)
    const finalOutput: outputData = {
        "pickingOrder": output,
        "distance": Math.ceil(finalDist)
    };

    return finalOutput;

}
