import { Router } from "express";
import MainController from "../controllers/mainController";

const mainRouter = Router();

mainRouter.get("/", MainController.root);
mainRouter.post("/", MainController.rootPost);


export default mainRouter;
