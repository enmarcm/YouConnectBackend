"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivateCodeModel = exports.GroupContactModel = exports.ContactModel = exports.GroupModel = exports.UserModel = void 0;
const instances_1 = require("../data/instances");
const schemasDefinitions_1 = require("../typegoose/schemasDefinitions");
const UserModel = instances_1.ITSGooseHandler.createModel({ clazz: schemasDefinitions_1.User });
exports.UserModel = UserModel;
const GroupModel = instances_1.ITSGooseHandler.createModel({ clazz: schemasDefinitions_1.Group });
exports.GroupModel = GroupModel;
const ContactModel = instances_1.ITSGooseHandler.createModel({ clazz: schemasDefinitions_1.Contact });
exports.ContactModel = ContactModel;
const GroupContactModel = instances_1.ITSGooseHandler.createModel({
    clazz: schemasDefinitions_1.GroupContact,
});
exports.GroupContactModel = GroupContactModel;
const ActivateCodeModel = instances_1.ITSGooseHandler.createModel({
    clazz: schemasDefinitions_1.ActivateCode,
});
exports.ActivateCodeModel = ActivateCodeModel;
