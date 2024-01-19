import { fetchData } from "./types";

export const getProduct = (productId: string): Promise<fetchData[]> => {
    const url: string = `https://dev.aux.boxpi.com/case-study/products/${productId}/positions`;
    let item: fetchData[] = [];
    console.log("funkcia volana");

    return fetch(url, {
        method: "GET",
        headers: {
            "x-api-key": "MVGBMS0VQI555bTery9qJ91BfUpi53N24SkKMf9Z"
        }
    })
    .then((res) => {
        console.log("return res.json");
        return res.json();
    })
    .then((data) => {
        console.log("return data");
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