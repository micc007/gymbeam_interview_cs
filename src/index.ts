import express, { Express, Request, Response} from "express";

let app: Express = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
    res.send("route working");
})

app.listen(port, () => {
    console.log("app listening");
});