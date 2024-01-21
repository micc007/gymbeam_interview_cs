import express, { Express } from "express";
import calculatePathController from "./controller/calculatePathController";
import dotenv from 'dotenv';
dotenv.config();

let app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', calculatePathController);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});