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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../typegoose/models");
const instances_1 = require("../data/instances");
class GroupsModelClass {
    static createGroup(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, description, idUser, maxContacts = 50, }) {
            try {
                const group = yield instances_1.ITSGooseHandler.addDocument({
                    Model: models_1.GroupModel,
                    data: { name, description, idUser, maxContacts },
                });
                return group;
            }
            catch (error) {
                console.error(`Error creating group: ${error} in createGroup method in GroupsModelClass.ts`);
                throw new Error(`Error creating group: ${error}`);
            }
        });
    }
    static getGroupsByUserId(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser }) {
            try {
                const groupsContact = yield instances_1.ITSGooseHandler.searchRelations({
                    Model: models_1.GroupModel,
                    id: idUser,
                    relationField: "idUser",
                });
                if (groupsContact.length === 0 || "error" in groupsContact)
                    return [];
                const groups = yield Promise.all(groupsContact.map((groupContact) => {
                    if (!groupContact.id)
                        return;
                    return instances_1.ITSGooseHandler.searchId({
                        Model: models_1.GroupModel,
                        id: groupContact.id,
                    });
                }));
                return groups;
            }
            catch (error) {
                console.error(`Error getting all groups by user id: ${error} in getGroupsByUserId method in GroupsModelClass.ts`);
                throw new Error(`Error getting all groups by user id: ${error}`);
            }
        });
    }
    static deleteGroup(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const result = yield GroupsModelClass.deleteGroupAndContacts({
                    idGroup: id,
                });
                return result;
            }
            catch (error) {
                console.error(`Error deleting group: ${error} in deleteGroup method in GroupsModelClass.ts`);
                throw new Error(`Error deleting group: ${error}`);
            }
        });
    }
    static viewAllGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield instances_1.ITSGooseHandler.searchAll({ Model: models_1.GroupModel });
                return groups;
            }
            catch (error) {
                console.error(`Error getting all groups: ${error} in viewAllGroups method in GroupsModelClass.ts`);
                throw new Error(`Error getting all groups: ${error}`);
            }
        });
    }
    static updateGroup(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, newGroupData, }) {
            try {
                const group = yield instances_1.ITSGooseHandler.editDocument({
                    Model: models_1.GroupModel,
                    id,
                    newData: newGroupData,
                });
                return group;
            }
            catch (error) {
                console.error(`Error updating group: ${error} in updateGroup method in GroupsModelClass.ts`);
                throw new Error(`Error updating group: ${error}`);
            }
        });
    }
    static getInfoGroup(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const group = yield instances_1.ITSGooseHandler.searchId({ Model: models_1.GroupModel, id });
                if (!group)
                    return { error: "Group not found" };
                return group;
            }
            catch (error) {
                console.error(`Error getting group info: ${error} in getInfoGroup method in GroupsModelClass.ts`);
                throw new Error(`Error getting group info: ${error}`);
            }
        });
    }
    static getGroupsByContactId(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idContact }) {
            try {
                const groupContacts = yield instances_1.ITSGooseHandler.searchRelations({
                    Model: models_1.GroupContactModel,
                    id: idContact,
                    relationField: "idContact",
                    lean: true
                });
                if (groupContacts.length === 0 || "error" in groupContacts)
                    return [];
                const groups = yield Promise.all(groupContacts.map((groupContact) => {
                    if (!groupContact.idGroup)
                        return;
                    return instances_1.ITSGooseHandler.searchId({
                        Model: models_1.GroupModel,
                        id: groupContact.idGroup,
                    });
                }));
                // Filtrar los resultados undefined
                const filteredGroups = groups.filter((group) => group !== undefined);
                // Verificar si no se encontraron grupos
                if (filteredGroups.length === 0) {
                    throw new Error("No groups found for the provided contact id");
                }
                return filteredGroups;
            }
            catch (error) {
                console.error(`Error getting all groups by contact id: ${error} in getGroupsByContactId method in GroupsModelClass.ts`);
                throw new Error(`Error getting all groups by contact id: ${error}`);
            }
        });
    }
    static addContactToGroup(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idGroup, idContact, }) {
            try {
                const groupContact = yield instances_1.ITSGooseHandler.addDocument({
                    Model: models_1.GroupContactModel,
                    data: { idGroup, idContact },
                });
                return groupContact;
            }
            catch (error) {
                console.error(`Error adding contact to group: ${error} in addContactToGroup method in GroupsModelClass.ts`);
                throw new Error(`Error adding contact to group: ${error}`);
            }
        });
    }
    static removeContactFromGroup(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idGroup, idContact, }) {
            try {
                const groupContact = yield instances_1.ITSGooseHandler.searchOne({
                    Model: models_1.GroupContactModel,
                    condition: { idGroup, idContact },
                });
                if (!groupContact) {
                    throw new Error(`GroupContact with idGroup ${idGroup} and idContact ${idContact} not found`);
                }
                yield instances_1.ITSGooseHandler.removeDocument({
                    Model: models_1.GroupContactModel,
                    id: groupContact.id,
                });
                return groupContact;
            }
            catch (error) {
                console.error(`Error removing contact from group: ${error} in removeContactFromGroup method in GroupsModelClass.ts`);
                throw new Error(`Error removing contact from group: ${error}`);
            }
        });
    }
    static removeGroupContacts(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idGroup, idContact, }) {
            try {
                if ((!idGroup && !idContact) || (idGroup && idContact)) {
                    throw new Error("Either idGroup or idContact must be provided");
                }
                const condition = idGroup
                    ? { idGroup }
                    : { idContact };
                const groupContacts = yield instances_1.ITSGooseHandler.searchOne({
                    Model: models_1.GroupContactModel,
                    condition,
                });
                if (!groupContacts || groupContacts.length === 0) {
                    throw new Error(`No GroupContacts found with ${idGroup ? "idGroup " + idGroup : "idContact " + idContact}`);
                }
                yield Promise.all(groupContacts.map((groupContact) => instances_1.ITSGooseHandler.removeDocument({
                    Model: models_1.GroupContactModel,
                    id: groupContact.id,
                })));
                return groupContacts;
            }
            catch (error) {
                console.error(`Error removing group contacts: ${error} in removeGroupContacts method in GroupsModelClass.ts`);
                throw new Error(`Error removing group contacts: ${error}`);
            }
        });
    }
    //TODO: PROBAR ESTE METODO Y SI FUNCIONA, BORRAR EL METODO removeGroupContacts
    static deleteGroupAndContacts(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idGroup }) {
            try {
                // Get all contacts of the group from the groupcontact collection
                const groupContacts = yield instances_1.ITSGooseHandler.searchRelations({
                    Model: models_1.GroupContactModel,
                    id: idGroup,
                    relationField: "idGroup",
                });
                // Delete all contacts of the group from the groupcontact collection
                yield Promise.all(groupContacts.map((groupContact) => instances_1.ITSGooseHandler.removeDocument({
                    Model: models_1.GroupContactModel,
                    id: groupContact.id,
                })));
                // Delete the group
                const group = yield instances_1.ITSGooseHandler.removeDocument({
                    Model: models_1.GroupModel,
                    id: idGroup,
                });
                return group;
            }
            catch (error) {
                console.error(`Error deleting group and contacts: ${error} in deleteGroupAndContacts method in GroupsModelClass.ts`);
                throw new Error(`Error deleting group and contacts: ${error}`);
            }
        });
    }
}
exports.default = GroupsModelClass;
