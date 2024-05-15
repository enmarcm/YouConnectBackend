import { Request, Response } from "express";
import { UserModel } from "../typegoose/models";
import { ITSGooseHandler } from "../data/instances";

class MainController {
  static async root(_req: Request, res: Response) {
    const data = await ITSGooseHandler.searchAll({ Model: UserModel });
    return res.json({ data });
  }

  static async rootPost(req: Request, res: Response) {
    const data = await ITSGooseHandler.addDocument({
      Model: UserModel,
      data: req.body
    });

    res.json({ data });
  }
}

export default MainController;
