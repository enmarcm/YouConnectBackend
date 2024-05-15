import { Ref } from "@typegoose/typegoose";
import { Contact } from "./schemasDefinitions";

export class UserValidations {
  static userNameValidate = () => ({
    validator: (v: string) => /^[a-zA-Z0-9]{6,10}$/.test(v),
    message:
      "Username must be 6-10 characters long and contain only letters and numbers.",
  });

  static emailValidate = () => ({
    validator: (v: string) => /\S+@\S+\.\S+/.test(v),
    message: "Email is not valid!",
  });

  static passwordValidate = () => ({
    validator: (v: string) => /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/.test(v),
    message: "Password must be 8-12 characters long, contain at least one uppercase letter and one number.",
  });

  static imageValidate = () => ({
    validator: (v: string) =>
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v),
    message: "Image must be a valid URL.",
  });

  static dateOfBirtValidate = () => ({
    validator: (v: Date) => !isNaN(v.getTime()),
    message: "Date of birth must be a valid date.",
  });

  static contactsValidate = () => ({
    validator: (v: Ref<Contact>[]) => Array.isArray(v),
    message: "Contacts must be an array.",
  });
}
