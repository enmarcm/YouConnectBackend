"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContactModelClass_1 = __importDefault(require("../models/ContactModelClass"));
const GroupsModelClass_1 = __importDefault(require("../models/GroupsModelClass"));
const contactController_1 = __importDefault(require("./contactController"));
class GroupController {
    static verifyUserOwnership(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, idGroup, }) {
            try {
                const group = yield GroupsModelClass_1.default.getInfoGroup({ id: idGroup });
                if ("error" in group)
                    throw new Error("Group not found. Error verifying user ownership");
                if (!group || group.idUser !== idUser)
                    throw new Error("User is not the owner of the group. Error verifying user ownership");
                return true;
            }
            catch (error) {
                throw new Error(`Error verifying user ownership: ${error}`);
            }
        });
    }
    static createGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idUser } = req;
                const { name, description, maxContacts = 50 } = req.body;
                const group = yield GroupsModelClass_1.default.createGroup({
                    name,
                    description,
                    idUser,
                    maxContacts,
                });
                return res.status(201).json(group);
            }
            catch (error) {
                console.error(`Error creating group: ${error}`);
                return res.status(500).json({ error: "Error creating group" });
            }
        });
    }
    static getGroupsByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idUser } = req;
                const groups = yield GroupsModelClass_1.default.getGroupsByUserId({ idUser });
                return res.status(200).json(groups);
            }
            catch (error) {
                console.error(`Error getting groups by user id: ${error}`);
                return res.status(500).json({ error: "Error getting groups by user id" });
            }
        });
    }
    static getGroupsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const groups = yield GroupsModelClass_1.default.getGroupsByUserId({ idUser: id });
                return res.status(200).json(groups);
            }
            catch (error) {
                console.error(`Error getting groups by user id: ${error}`);
                return res.status(500).json({ error: "Error getting groups by user id" });
            }
        });
    }
    static deleteGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { idUser } = req;
                //Verify group exists
                const group = yield GroupsModelClass_1.default.getInfoGroup({ id });
                if ("error" in group || !group)
                    return res.status(404).json({ error: "Group not found" });
                //Veify ownership of the group by the user
                yield GroupController.verifyUserOwnership({
                    idUser: idUser,
                    idGroup: id,
                });
                const deleteGroup = yield GroupsModelClass_1.default.deleteGroup({ id });
                //Aqui hay que borrar tambien de la otra collecion, la de contactos y grupos
                const deleteGroupContact = yield GroupsModelClass_1.default.removeGroupContacts({
                    idGroup: id,
                });
                const message = Object.assign(Object.assign({ message: `Group ${id} deleted successfully` }, deleteGroup), deleteGroupContact);
                return res.status(204).json(message);
            }
            catch (error) {
                console.error(`Error deleting group: ${error}`);
                return res.status(500).json({ error: "Error deleting group" });
            }
        });
    }
    static viewAllGroups(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield GroupsModelClass_1.default.viewAllGroups();
                return res.status(200).json(groups);
            }
            catch (error) {
                console.error(`Error viewing all groups: ${error}`);
                return res.status(500).json({ error: "Error viewing all groups" });
            }
        });
    }
    static updateGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, description, maxContacts } = req.body;
                const { idUser } = req;
                //Verify group exists
                const groupExist = yield GroupsModelClass_1.default.getInfoGroup({ id });
                if ("error" in groupExist || !groupExist)
                    return res.status(404).json({ error: "Group not found" });
                //Verify user ownership
                yield GroupController.verifyUserOwnership({ idUser, idGroup: id });
                const group = yield GroupsModelClass_1.default.updateGroup({
                    id,
                    newGroupData: {
                        idUser,
                        name,
                        description,
                        maxContacts,
                    },
                });
                return res.status(200).json(group);
            }
            catch (error) {
                console.error(`Error updating group: ${error}`);
                return res.status(500).json({ error: "Error updating group" });
            }
        });
    }
    static getInfoGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                // Validar que el ID recibido es correcto
                if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                    return res.status(400).json({ error: "Invalid ID format" });
                }
                // Obtener información del grupo
                const group = yield GroupsModelClass_1.default.getInfoGroup({ id });
                if (!group) {
                    return res.status(404).json({ error: "Group not found" });
                }
                const contacts = yield GroupsModelClass_1.default.getContactsByGroupId({ idGroup: id });
                const groupWithContacts = Object.assign(Object.assign({}, group), { contacts });
                return res.json(groupWithContacts);
            }
            catch (error) {
                console.error(`Error getting group info: ${error}`);
                return res.status(500).json({ error: "Error getting group info" });
            }
        });
    }
    static getGroupsByContactId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idContact } = req.params;
                const groups = yield GroupsModelClass_1.default.getGroupsByContactId({ idContact });
                return res.status(200).json(groups);
            }
            catch (error) {
                console.error(`Error getting groups by contact id: ${error}`);
                return res
                    .status(500)
                    .json({ error: "Error getting groups by contact id" });
            }
        });
    }
    static addContactToGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idGroup, idContact } = req.body;
                const { idUser } = req;
                //Hay que verificar que exista el grupo y el contacto
                const group = yield GroupsModelClass_1.default.getInfoGroup({ id: idGroup });
                if ("error" in group)
                    return res.status(404).json({ error: "Group not found" });
                const contact = yield ContactModelClass_1.default.getContactById({ id: idContact });
                if ("error" in contact)
                    return res.status(404).json({ error: "Contact not found" });
                yield GroupController.verifyUserOwnership({ idUser: idUser, idGroup });
                yield contactController_1.default.verifyUserOwnership({
                    idUser: idUser,
                    idContact,
                });
                const groupContact = yield GroupsModelClass_1.default.addContactToGroup({
                    idGroup,
                    idContact,
                });
                return res.status(201).json(groupContact);
            }
            catch (error) {
                console.error(`Error adding contact to group: ${error}`);
                return res.status(500).json({ error: "Error adding contact to group" });
            }
        });
    }
    static removeContactFromGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idGroup, idContact } = req.body;
                const { idUser } = req;
                //Verificar que exista el grupo y el contacto
                const group = yield GroupsModelClass_1.default.getInfoGroup({ id: idGroup });
                if ("error" in group || !group)
                    return res.status(404).json({ error: "Group not found" });
                const contact = yield ContactModelClass_1.default.getContactById({ id: idContact });
                if ("error" in contact || !contact)
                    return res.status(404).json({ error: "Contact not found" });
                //Verify owenership of the group
                yield GroupController.verifyUserOwnership({ idUser: idUser, idGroup });
                yield contactController_1.default.verifyUserOwnership({
                    idUser: idUser,
                    idContact,
                });
                const groupContact = yield GroupsModelClass_1.default.removeContactFromGroup({
                    idGroup,
                    idContact,
                });
                return res.status(204).json(groupContact);
            }
            catch (error) {
                console.error(`Error removing contact from group: ${error}`);
                return res
                    .status(500)
                    .json({ error: "Error removing contact from group" });
            }
        });
    }
    static getContactsByGroupId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idGroup } = req.params;
                const contacts = yield GroupsModelClass_1.default.getContactsByGroupId({ idGroup });
                return res.status(200).json(contacts);
            }
            catch (error) {
                console.error(`Error getting contacts by group id: ${error}`);
                return res
                    .status(500)
                    .json({ error: "Error getting contacts by group id" });
            }
        });
    }
}
exports.default = GroupController;
