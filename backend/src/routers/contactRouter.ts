import { Router } from "express";
import C from "../controllers/contactController";

const contactRouter = Router();

contactRouter.get("/", C.mainContact);

contactRouter.get("/all", C.getAllContacts);
contactRouter.get("/allByUser", C.getContactsByUserId);
contactRouter.get("/:id", C.getContactById);

contactRouter.post("/create", C.createContact);

contactRouter.put("/update", C.updateContact);

contactRouter.delete("/delete/:id", C.deleteContact);

export default contactRouter;
