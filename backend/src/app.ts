import express from "express";
import { PORT } from "./constants";
import { startServer } from "./functions";
import {
  midCors,
  midJson,
  midNotFound,
  midNotJson,
} from "./middlewares/middlewares";
import R from "./routers/allRouters"

const app = express();
app.use(midJson());
app.use(midCors());
app.use(midNotJson);

//{ Routes
app.use(R.mainRouter)
app.use(R.authRouter)
app.use(R.contactRouter)
app.use(R.groupRouter)
app.use(R.profileRouter)

app.use(midNotFound);

startServer({ app, PORT });
