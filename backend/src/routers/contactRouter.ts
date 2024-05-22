import { Router } from "express";
import C from "../controllers/contactController";
import { midValidateId } from "../middlewares/middlewares";

const contactRouter = Router();

contactRouter.get("/", C.mainContact);

contactRouter.get("/all", C.getAllContacts);
contactRouter.get("/allByUser", C.getContactsByUserId);
contactRouter.get("/:id", midValidateId, C.getContactById);

contactRouter.post("/create", C.createContact);

contactRouter.put("/update", C.updateContact);

contactRouter.delete("/delete/:id", midValidateId, C.deleteContact);

export default contactRouter;
