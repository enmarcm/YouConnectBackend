import { Router } from "express";

const contactRouter = Router();

contactRouter.post("/", (_req, res) => {
  res.json({ message: "Contact router" });
});

export default contactRouter;
