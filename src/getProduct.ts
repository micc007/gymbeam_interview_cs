import { productData } from "./types";

export const getProduct = (productId: string): Promise<productData[]> => {
    const url: string = `https://dev.aux.boxpi.com/case-study/products/${productId}/positions`;
    let item: productData[] = [];

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "MVGBMS0VQI555bTery9qJ91BfUpi53N24SkKMf9Z",
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
    // item = [...item, ...data];

    
    // console.log(data);
    // item = [...item, ...data];
    // console.log(item);

    // .catch((err) => {
    //     Promise.reject(err);
    // });

    // const { data, err } = await res.json();
    // if(err) {
    //     throw new Error(err.message);
    // }

    
}