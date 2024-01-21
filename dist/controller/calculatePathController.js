"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getProduct_1 = require("../functions/getProduct");
const calculatePath_1 = require("../functions/calculatePath");
const calculatePathController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // expect input in request body
    if (!req.body.products)
        return res.send("this is only a REST API, no content here");
    const productId = [];
    let inputData = [];
    const startX = req.body.startingPosition.x;
    const startY = req.body.startingPosition.y;
    const startZ = req.body.startingPosition.z;
    // parse product ID's from req.body
    req.body.products.forEach((id) => {
        productId.push(id);
    });
    let singleItem;
    // fetch all products
    for (let i = 0; i < productId.length; i++) {
        singleItem = yield (0, getProduct_1.getProduct)(productId[i]);
        inputData = [...inputData, ...singleItem];
        singleItem = [];
    }
    const finalOutput = (0, calculatePath_1.calculatePath)(inputData, startX, startY, startZ);
    res.send(finalOutput).status(200);
});
exports.default = calculatePathController;
