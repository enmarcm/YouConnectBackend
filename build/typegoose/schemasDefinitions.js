"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivateCode = exports.GroupContact = exports.Contact = exports.Group = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const schemasValidations_1 = require("./schemasValidations");
const enums_1 = require("../enums");
class User {
}
exports.User = User;
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: String,
        validate: schemasValidations_1.UserValidations.userNameValidate(),
    })
], User.prototype, "userName", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: String,
        validate: schemasValidations_1.UserValidations.emailValidate(),
    })
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: String,
    })
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: false,
        type: String,
        validate: schemasValidations_1.UserValidations.imageValidate(),
    })
], User.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: false,
        type: Date,
        validate: schemasValidations_1.UserValidations.dateOfBirtValidate(),
    })
], User.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, type: Number, default: 3 })
], User.prototype, "attempts", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, type: Boolean, default: false })
], User.prototype, "blocked", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, type: Boolean, default: false })
], User.prototype, "active", void 0);
class Group {
}
exports.Group = Group;
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: String,
        validate: schemasValidations_1.GroupValidation.nameValidate(),
    })
], Group.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: false,
        type: String,
        validate: schemasValidations_1.GroupValidation.descriptionValidate(),
    })
], Group.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, type: Number })
], Group.prototype, "maxContacts", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: User, required: true, type: String })
], Group.prototype, "idUser", void 0);
class Contact {
}
exports.Contact = Contact;
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: String,
        validate: schemasValidations_1.ContactValidations.nameValidate(),
    })
], Contact.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: false,
        type: String,
        validate: schemasValidations_1.ContactValidations.emailValidate(),
    })
], Contact.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: (Array),
        validate: schemasValidations_1.ContactValidations.numberValidate(),
    })
], Contact.prototype, "number", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: User, required: true, type: String })
], Contact.prototype, "idUser", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: false,
        type: String,
        validate: schemasValidations_1.ContactValidations.imageValidate(),
        default: enums_1.Constants.IMAGE_DEFAULT,
    })
], Contact.prototype, "image", void 0);
class GroupContact {
}
exports.GroupContact = GroupContact;
__decorate([
    (0, typegoose_1.prop)({ ref: Group, required: true, type: String })
], GroupContact.prototype, "idGroup", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: Contact, required: true, type: String })
], GroupContact.prototype, "idContact", void 0);
class ActivateCode {
}
exports.ActivateCode = ActivateCode;
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String })
], ActivateCode.prototype, "code", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String })
], ActivateCode.prototype, "idUser", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Date.now, type: Date })
], ActivateCode.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ expires: 7200, type: Date })
], ActivateCode.prototype, "expireAt", void 0);
