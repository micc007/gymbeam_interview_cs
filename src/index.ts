import express, { Express } from "express";
import calculatePathController from "./controller/calculatePathController";

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

app.get('/', calculatePathController);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});