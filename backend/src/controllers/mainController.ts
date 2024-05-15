import { Request, Response } from "express";

class MainController {
  static root(_req: Request, res: Response) {
    return res.json({ message: "Hello World" });
  }
}

export default MainController;
