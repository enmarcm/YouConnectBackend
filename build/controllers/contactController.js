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
const enums_1 = require("../enums");
class ContactController {
    static mainContact(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json("Hello from ContactController");
        });
    }
    static createContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body, idUser } = req;
                let { name, email, number, image = enums_1.Constants.IMAGE_DEFAULT, } = body;
                // Ensure number is an array
                number = Array.isArray(number) ? number : [number];
                // Verify if contact name or number already exists in the same user
                yield ContactController.verifyContactUniqueness({ idUser, name, number });
                const newContact = yield ContactModelClass_1.default.createContact({
                    idUser,
                    name,
                    email,
                    number,
                    image,
                });
                return res.json({
                    message: "Created new contact successfully",
                    newContact,
                });
            }
            catch (error) {
                console.error(`Error creating contact: ${error}`);
                return res
                    .status(500)
                    .json({ error: `Error creating contact: ${error}` });
            }
        });
    }
    static getContactById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const contact = yield ContactModelClass_1.default.getContactById({ id });
                if (!contact)
                    return res.status(404).json({ error: "Contact not found" });
                return res.json(contact);
            }
            catch (error) {
                console.error(`Error getting contact by id: ${error}`);
                return res
                    .status(500)
                    .json({ error: `Error getting contact by id: ${error}` });
            }
        });
    }
    static getAllContacts(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield ContactModelClass_1.default.getAllContacts();
                return res.json(contacts);
            }
            catch (error) {
                console.error(`Error getting all contacts: ${error}`);
                return res
                    .status(500)
                    .json({ error: `Error getting all contacts: ${error}` });
            }
        });
    }
    static updateContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const { id, contact } = body;
                // Ensure number is an array
                contact.number = Array.isArray(contact.number)
                    ? contact.number
                    : [contact.number];
                const updatedContact = yield ContactModelClass_1.default.updateContactById({
                    id,
                    contact,
                });
                if (!updatedContact)
                    return res.status(404).json({ error: "Contact not found" });
                return res.json(updatedContact);
            }
            catch (error) {
                console.error(`Error updating contact: ${error}`);
                return res
                    .status(500)
                    .json({ error: `Error updating contact: ${error}` });
            }
        });
    }
    static deleteContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedContact = yield ContactModelClass_1.default.deleteContactById({ id });
                if (!deletedContact)
                    return res.status(404).json({ error: "Contact not found" });
                return res.json({
                    message: "Contact deleted successfully",
                    deletedContact,
                });
            }
            catch (error) {
                console.error(`Error deleting contact: ${error}`);
                return res
                    .status(500)
                    .json({ error: `Error deleting contact: ${error}` });
            }
        });
    }
    static getContactsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //TODO: MEJORAR ESTO
                //! Se supone que el token
                const { idUser } = req;
                const contacts = yield ContactModelClass_1.default.getAllContactsByUserId({
                    idUser,
                });
                if (contacts.length === 0)
                    return res.status(404).json({ error: "Contacts not found" });
                return res.json(contacts);
            }
            catch (error) {
                console.error(`Error getting contacts by user id: ${error}`);
                return res
                    .status(500)
                    .json({ error: `Error getting contacts by user id: ${error}` });
            }
        });
    }
    static verifyUserOwnership(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, idContact, }) {
            try {
                const contact = yield ContactModelClass_1.default.getContactById({ id: idContact });
                if (!contact || (contact === null || contact === void 0 ? void 0 : contact.idUser) !== idUser || "error" in contact)
                    throw new Error("Contact not found or not yours");
                return true;
            }
            catch (error) {
                console.error(`Error verifying user ownership: ${error}. In verifyUserOwnership method in ContactController.ts`);
                throw new Error(`Error verifying user ownership: ${error}`);
            }
        });
    }
    static verifyContactUniqueness(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idUser, name, number, }) {
            try {
                // Ensure number is an array
                number = Array.isArray(number) ? number : [number];
                const existingContact = yield ContactModelClass_1.default.getContactByUserAndNameOrNumber({
                    idUser,
                    name,
                    number,
                });
                if (existingContact)
                    throw new Error("Contact already exists with the same name or number");
                return true;
            }
            catch (error) {
                console.error(`Error verifying contact uniqueness: ${error}. In verifyContactUniqueness method in ContactController.ts`);
                throw new Error(`Error verifying contact uniqueness: ${error}`);
            }
        });
    }
}
exports.default = ContactController;
