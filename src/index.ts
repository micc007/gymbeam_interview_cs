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
    const { startX, startY, startZ }: { startX: number, startY: number, startZ: number} = req.body.startingPosition;

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
    let result: number, xRes: number, yRes: number, zRes: number; // vars for calculating distance 
    let nextId: string = "";
    let filteredData: productData[] = inputData;
    let output: orderItem[] = [];

    while(filteredData.length > 0) {
        for(let i: number = 0; i < filteredData.length; i++){
            xRes = Number(Math.pow((currItem.x - filteredData[i].x),2));
            yRes = Number(Math.pow((currItem.y - filteredData[i].y),2));
            zRes = Number(Math.pow((currItem.z - filteredData[i].z),2));
            result = Math.sqrt(xRes + yRes + zRes);
    
            if(i === 0) lowestDist = result;
            if(lowestDist > result){
                lowestDist = result;
                currItem = {
                    positionId: filteredData[i].positionId,
                    x: filteredData[i].x, 
                    y: filteredData[i].y, 
                    z: filteredData[i].z,
                    productId: filteredData[i].productId,
                    quantity: filteredData[i].quantity
                }
                nextId = inputData[i].productId;
            }
        }

        finalDist += lowestDist;

        // push current closest item to output array
        let outputItem: orderItem = {
            "productId": currItem.productId,
            "positionId": currItem.positionId
        };
        output.push(outputItem);

        filteredData = filteredData.filter((item) => item.productId !== nextId); // remove all instances of an already picked item
    }

    const finalOutput: outputData = {
        "pickingOrder": output,
        "distance": finalDist
    };

    res.send(finalOutput);

});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});