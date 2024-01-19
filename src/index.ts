import express, { Express, Request, Response} from "express";

import { getProduct } from "./getProduct";
import { fetchData } from "./types";

let app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req: Request, res: Response) => {

    /*
    
        INPUT
        {
            "products": ["id1","id2"...],
            "startingPosition": {
                "x": 0
                "y": 0
                "z": 0
            }
        }
    
        OUTPUT
        { 
            “pickingOrder”: [
                { "productId": "product-2", "positionId": "position-123" }, 
                { "productId": "product-1", "positionId": "position-55" }
            ], 
            "distance": 512 

    */

    let inputData: fetchData[] = [];
    const productId: string[] = ["product-1", "product-2"];
    
    const product1: fetchData[] = await getProduct(productId[0]);
    const product2: fetchData[] = await getProduct(productId[1]);
    
    inputData = [...inputData, ...product1, ...product2]

    res.send(product2);

})

app.listen(port, () => {
    console.log("app listening");
});