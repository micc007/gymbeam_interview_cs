import { productData } from "../types/types";

export const calcDist = (curr: productData, arr: productData): number => {
    const xRes: number = Number(Math.pow((Number(curr.x) - Number(arr.x)),2));
    const yRes: number = Number(Math.pow((Number(curr.y) - Number(arr.y)),2));
    const zRes: number = Number(Math.pow((Number(curr.z) - Number(arr.z)),2));
    const result = Number(Math.sqrt(xRes + yRes + zRes));
    return result;
}