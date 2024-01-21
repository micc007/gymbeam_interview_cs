"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = void 0;
const getProduct = (productId) => {
    const url = `https://dev.aux.boxpi.com/case-study/products/${productId}/positions`;
    let item = [];
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
};
exports.getProduct = getProduct;
