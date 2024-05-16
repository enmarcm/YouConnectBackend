import { Router } from "express";
import AuthController from "../controllers/authController";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.get("/activateUser/:code", AuthController.activateUser);

export default authRouter;


