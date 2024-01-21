import { productData } from "../types/types";

export const getProduct = (productId: string): Promise<productData[]> => {
    const url: string = `https://dev.aux.boxpi.com/case-study/products/${productId}/positions`;
    let item: productData[] = [];

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": `${process.env.GYMBEAM_API_KEY}`,
        }
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        item = [...item, ...data];
        return item;
    })
    .catch((err) => {
        console.log(err);
        return [];
    });
  
}