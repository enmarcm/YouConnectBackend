import express from "express";
import { PORT } from "./constants";
import { startServer } from "./functions";
import {
  midConnectDB,
  midCors,
  midJson,
  midNotFound,
  midNotJson,
  midValidJson,
  midErrorHandler,
  midToken,
} from "./middlewares/middlewares";
import R from "./routers/allRouters";
import { Routes } from "./enums";

const app = express();

//{ Middlewares
app.use(midJson());
app.use(midValidJson);
app.use(midCors());
app.use(midNotJson);
app.use(midConnectDB);

//{ Routes
app.use(Routes.MAIN, R.mainRouter);
app.use(Routes.AUTH, R.authRouter);

app.use(midToken);
app.use(Routes.CONTACT, R.contactRouter);
app.use(Routes.GROUP, R.groupRouter);
app.use(Routes.PROFILE, R.profileRouter);

app.use(midNotFound);
app.use(midErrorHandler);

startServer({ app, PORT });
