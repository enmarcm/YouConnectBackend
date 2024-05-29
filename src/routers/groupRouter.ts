import { Router } from "express";
import GroupController from "../controllers/groupController";
import { midValidateId } from "../middlewares/middlewares";

const groupRouter = Router();

groupRouter.get("/view/all", GroupController.viewAllGroups);

groupRouter.get("/view/allByUser", GroupController.getGroupsByUser);
groupRouter.get("/view/allByUser/:id", GroupController.getGroupsByUser);

groupRouter.get('/view/allByGroup/:idGroup', midValidateId, GroupController.getContactsByGroupId);

groupRouter.get(
  "/view/allByContact/:idContact",
  midValidateId,
  GroupController.getGroupsByContactId
);

groupRouter.get("/view/one/:id", midValidateId, GroupController.getInfoGroup);

groupRouter.post("/create", GroupController.createGroup);

groupRouter.post(
  "/addContact",
  midValidateId,
  GroupController.addContactToGroup
);

groupRouter.delete("/delete/:id", midValidateId, GroupController.deleteGroup);

groupRouter.delete(
  "/deleteContact/:id",
  GroupController.removeContactFromGroup
);

groupRouter.put("/update/:id", midValidateId, GroupController.updateGroup);

export default groupRouter;
