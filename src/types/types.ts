export type inputData = {
    "products": string[],
    "startingPosition": {
        "x": number,
        "y": number,
        "z": number
    }
}

export type productData = {
    "positionId": string,
    "x": number,
    "y": number,
    "z": number,
    "productId": string,
    "quantity": number
}

export type orderItem = {
    "productId": string,
    "positionId": string
}

export type outputData = {
    "pickingOrder": orderItem[],
    "distance": number
}