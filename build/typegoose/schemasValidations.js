"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactValidations = exports.GroupValidation = exports.UserValidations = void 0;
class UserValidations {
}
exports.UserValidations = UserValidations;
UserValidations.userNameValidate = () => ({
    validator: (v) => /^[a-zA-Z0-9]{6,10}$/.test(v),
    message: "Username must be 6-10 characters long and contain only letters and numbers.",
});
UserValidations.emailValidate = () => ({
    validator: (v) => /\S+@\S+\.\S+/.test(v),
    message: "Email is not valid!",
});
UserValidations.imageValidate = () => ({
    validator: (v) => /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v),
    message: "Image must be a valid URL.",
});
UserValidations.dateOfBirtValidate = () => ({
    validator: (v) => !isNaN(new Date(v).getTime()),
    message: "Date of birth must be a valid date.",
});
UserValidations.contactsValidate = () => ({
    validator: (v) => Array.isArray(v),
    message: "Contacts must be an array.",
});
class GroupValidation {
}
exports.GroupValidation = GroupValidation;
GroupValidation.nameValidate = () => ({
    validator: (v) => /^[a-zA-Z0-9\s]{1,20}$/.test(v),
    message: "Name must be 1-20 characters long and contain only letters, numbers, and spaces.",
});
GroupValidation.descriptionValidate = () => ({
    validator: (v) => /^[a-zA-Z0-9\s]{1,200}$/.test(v),
    message: "Description must be 1-200 characters long and contain only letters, numbers, and spaces.",
});
class ContactValidations {
}
exports.ContactValidations = ContactValidations;
ContactValidations.nameValidate = () => ({
    validator: (v) => /^[a-zA-Z0-9\s]{1,30}$/.test(v),
    message: "Name must be 1-30 characters long and contain only letters, numbers, and spaces.",
});
ContactValidations.emailValidate = () => ({
    validator: (v) => /\S+@\S+\.\S+/.test(v),
    message: "Email is not valid!",
});
ContactValidations.numberValidate = () => ({
    validator: (v) => v.length > 0 && v.every((num) => /^(\+?\d{1,4})?(\(?\d{1,4}\)?[\s-]?)?[\d\s-]{3,10}(\*?\d+)?$/.test(num)),
    message: "Each number must be a valid phone number and there must be at least one number.",
});
ContactValidations.imageValidate = () => ({
    validator: (v) => /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v),
    message: "Image must be a valid URL.",
});
