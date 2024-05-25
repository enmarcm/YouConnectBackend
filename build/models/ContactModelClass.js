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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const instances_1 = require("../data/instances");
const models_1 = require("../typegoose/models");
class ContactModelClass {
    static getAllContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield instances_1.ITSGooseHandler.searchAll({ Model: models_1.ContactModel });
                return contacts;
            }
            catch (error) {
                throw new Error(`Error getting all contacts: ${error}`);
            }
        });
    }
    static getContactById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const contact = yield instances_1.ITSGooseHandler.searchId({
                    Model: models_1.ContactModel,
                    id,
                });
                return contact;
            }
            catch (error) {
                throw new Error(`Error getting contact by id: ${error}`);
            }
        });
    }
    static getAllContactsByUserId(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser }) {
            try {
                const contactsUser = yield instances_1.ITSGooseHandler.searchRelations({
                    Model: models_1.ContactModel,
                    id: idUser,
                    relationField: "idUser",
                    onlyId: true,
                    transform: (doc) => {
                        const { idUser } = doc, rest = __rest(doc, ["idUser"]);
                        return rest;
                    },
                });
                if (contactsUser.length === 0 || "error" in contactsUser)
                    return [];
                return contactsUser;
            }
            catch (error) {
                console.error(`Error getting all contacts by user id: ${error} in getAllContactsByUserId method in ContactModelClass.ts`);
                throw new Error(`Error getting all contacts by user id: ${error}`);
            }
        });
    }
    static createContact(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const numbers = Array.isArray(contact.number)
                    ? contact.number
                    : [contact.number];
                const contactParsed = Object.assign(Object.assign({}, contact), { number: numbers });
                const newContact = yield instances_1.ITSGooseHandler.addDocument({
                    Model: models_1.ContactModel,
                    data: contactParsed,
                });
                if ("error" in newContact)
                    throw new Error(`Error creating contact: ${newContact.error}`);
                return newContact;
            }
            catch (error) {
                console.error(`Error creating contact: ${error}. in createContact method in ContactModelClass.ts`);
                throw new Error(`Error creating contact: ${error}`);
            }
        });
    }
    static updateContactById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, contact }) {
            try {
                const numbers = Array.isArray(contact.number)
                    ? contact.number
                    : [contact.number];
                const contactParsed = Object.assign(Object.assign({}, contact), { number: numbers });
                const updatedContact = yield instances_1.ITSGooseHandler.editDocument({
                    Model: models_1.ContactModel,
                    id,
                    newData: contactParsed,
                });
                return updatedContact;
            }
            catch (error) {
                console.error(`Error updating contact by id: ${error}. in updateContactById method in ContactModelClass.ts`);
                throw new Error(`Error updating contact by id: ${error}`);
            }
        });
    }
    static deleteContactById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const deletedContact = yield instances_1.ITSGooseHandler.removeDocument({
                    Model: models_1.ContactModel,
                    id,
                });
                //TODO: Hay que borrar al contacto de todos los grupos en que este
                return deletedContact;
            }
            catch (error) {
                console.error(`Error deleting contact by id: ${error}. in deleteContactById method in ContactModelClass.ts`);
                throw new Error(`Error deleting contact by id: ${error}`);
            }
        });
    }
    static deleteAllContactsByUserId(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser }) {
            try {
                const result = yield instances_1.ITSGooseHandler.removeAllDocumentsByCondition({
                    Model: models_1.ContactModel,
                    condition: { idUser },
                });
                if ("error" in result) {
                    console.error(result.error);
                    return [];
                }
                return result;
            }
            catch (error) {
                console.error(error);
                throw new Error(`Error deleting all contacts by user id: ${error} in deleteAllContactsByUserId method in ContactModelClass.ts`);
            }
        });
    }
    static getContactByUserAndNameOrNumber(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, name, number, }) {
            try {
                const contact = yield instances_1.ITSGooseHandler.searchOne({
                    Model: models_1.ContactModel,
                    condition: { idUser, $or: [{ name }, { number: { $in: number } }] },
                });
                return contact;
            }
            catch (error) {
                console.error(`Error getting contact by user and name or number: ${error}. in getContactByUserAndNameOrNumber method in ContactModelClass.ts`);
                throw new Error(`Error getting contact by user and name or number: ${error}`);
            }
        });
    }
}
exports.default = ContactModelClass;
