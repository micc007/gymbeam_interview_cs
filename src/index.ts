import express, { Express, Request, Response} from "express";

import { getProduct } from "./getProduct";
import { orderItem, outputData, productData } from "./types";

let app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

 /*
    
    ENDPOINT INPUT (req.body)
    {
        "products": ["product-1","product-2"...],
        "startingPosition": {
            "x": 0,
            "y": 0,
            "z": 0
        }
    }

    FINAL OUTPUT (res.send)
    { 
        “pickingOrder”: [
            { "productId": "product-2", "positionId": "position-123" }, 
            { "productId": "product-1", "positionId": "position-55" }
        ], 
        "distance": 512 

*/

app.get('/', async (req: Request, res: Response) => {

    if(!req.body.products) return res.send("this is only a REST API, no content here");

    const productId: string[] = [];
    let inputData: productData[] = [];
    const startX: number = req.body.startingPosition.x; 
    const startY: number = req.body.startingPosition.y; 
    const startZ: number = req.body.startingPosition.z;

    req.body.products.forEach((id: string) => {
        productId.push(id);
    });

    let singleItem: productData[];

    for(let i: number = 0; i < productId.length; i++){
        singleItem = await getProduct(productId[i]);
        inputData = [...inputData, ...singleItem];
        singleItem = [];
    }

    let currItem: productData = {
        positionId: "",
        x: startX, 
        y: startY, 
        z: startZ,
        productId: "",
        quantity: 0
    };

    let lowestDist: number = 0; // lowest distance to the next product
    let finalDist: number = 0; // final distance when every product was selected
    let result: number = 0, xRes: number = 0, yRes: number = 0, zRes: number = 0; // vars for calculating distance 
    let nextId: string = "";
    let filteredData: productData[] = inputData;
    let output: orderItem[] = [];
    // let pokus: number = 2;

    while(filteredData.length > 0) {

        console.log(`lowestDist = ${lowestDist}`)

        for(let i: number = 0; i < filteredData.length; i++){
            xRes = Number(Math.pow((Number(currItem.x) - Number(filteredData[i].x)),2));
            yRes = Number(Math.pow((Number(currItem.y) - Number(filteredData[i].y)),2));
            zRes = Number(Math.pow((Number(currItem.z) - Number(filteredData[i].z)),2));
            result = Number(Math.sqrt(xRes + yRes + zRes));

            // console.log(`curr - ${currItem.x},${currItem.y},${currItem.z}`)
            // console.log(`filtered - ${filteredData[i].x},${filteredData[i].y},${filteredData[i].z}`)
            // console.log(`start - ${startX}, ${startY}, ${startZ}`)
    
            console.log(`result = ${result}`)

            // if(i === 0) lowestDist = result;

            // console.log(`xRes = ${xRes}, yRes = ${yRes}, zRes = ${zRes}, lowestDist = ${lowestDist}, result = ${result}`)

            if((lowestDist > result) || (i === 0)){
                lowestDist = result;
                currItem = {
                    positionId: filteredData[i].positionId,
                    x: filteredData[i].x, 
                    y: filteredData[i].y, 
                    z: filteredData[i].z,
                    productId: filteredData[i].productId,
                    quantity: filteredData[i].quantity
                }

                console.log(currItem)
                nextId = filteredData[i].productId;
            }
        }

        finalDist += lowestDist;
        lowestDist = 0;

        // push current closest item to output array
        let outputItem: orderItem = {
            "productId": currItem.productId,
            "positionId": currItem.positionId
        };
        output.push(outputItem);
        
        console.log("filtered length before - " + filteredData.length);
        filteredData = filteredData.filter((item) => item.productId !== nextId); // remove all instances of an already picked item
        console.log("filtered length after - " + filteredData.length);


        console.log(`lowestDist = ${lowestDist}`)
        // pokus--;
    }

    const finalOutput: outputData = {
        "pickingOrder": output,
        "distance": Math.ceil(finalDist)
    };

    res.send(finalOutput);


    // TEST

    // console.log("filtered length before - " + filteredData.length);
    // filteredData = filteredData.filter((item) => item.productId !== "product-1");
    // console.log("filtered length after - " + filteredData.length);

    // res.send(filteredData);

});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});