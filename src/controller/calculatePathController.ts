import { Request, Response, NextFunction } from "express";
import { getProduct } from "../functions/getProduct";
import { calculatePath } from "../functions/calculatePath";
import { productData } from "../types/types";

const calculatePathController = async (req: Request, res: Response, next: NextFunction) => {
    
    // expect input in request body
    if(!req.body.products) return res.send("this is only a REST API, no content here");

    const productId: string[] = [];
    let inputData: productData[] = [];
    const startX: number = req.body.startingPosition.x; 
    const startY: number = req.body.startingPosition.y; 
    const startZ: number = req.body.startingPosition.z;

    // parse product ID's from req.body
    req.body.products.forEach((id: string) => {
        productId.push(id);
    });

    let singleItem: productData[];
    
    // fetch all products
    for(let i: number = 0; i < productId.length; i++){
        singleItem = await getProduct(productId[i]);
        inputData = [...inputData, ...singleItem];
        singleItem = [];
    }

    const finalOutput = calculatePath(inputData, startX, startY, startZ);
    
    res.send(finalOutput).status(200); 
    
}

export default calculatePathController;