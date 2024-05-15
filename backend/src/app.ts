import express from "express";
import { PORT } from "./constants";
import { startServer } from "./functions";
import 'dotenv/config'
import { midCors, midJson, midNotJson } from "./middlewares/middlewares";

const app = express();
app.use(midJson());
app.use(midCors())
app.use(midNotJson)

startServer({app, PORT});