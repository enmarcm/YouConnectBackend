"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = __importDefault(require("../controllers/contactController"));
const contactRouter = (0, express_1.Router)();
contactRouter.get("/", contactController_1.default.mainContact);
contactRouter.get("/all", contactController_1.default.getAllContacts);
contactRouter.get("/allByUser", contactController_1.default.getContactsByUserId);
contactRouter.get("/:id", contactController_1.default.getContactById);
contactRouter.post("/create", contactController_1.default.createContact);
contactRouter.put("/update", contactController_1.default.updateContact);
contactRouter.delete("/delete/:id", contactController_1.default.deleteContact);
exports.default = contactRouter;
