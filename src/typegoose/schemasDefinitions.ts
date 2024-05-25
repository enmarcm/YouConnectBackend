import { prop, Ref } from "@typegoose/typegoose";
import {
  ContactValidations,
  GroupValidation,
  UserValidations,
} from "./schemasValidations";
import { Constants } from "../enums";

export class User {
  @prop({
    required: true,
    type: String,
    validate: UserValidations.userNameValidate(),
  })
  public userName!: string;

  @prop({
    required: true,
    type: String,
    validate: UserValidations.emailValidate(),
  })
  public email!: string;

  @prop({
    required: true,
    type: String,
  })
  public password!: string;

  @prop({
    required: false,
    type: String,
    validate: UserValidations.imageValidate(),
  })
  public image!: string;

  @prop({
    required: false,
    type: Date,
    validate: UserValidations.dateOfBirtValidate(),
  })
  public dateOfBirth!: Date;

  // @prop({
  //   required: false,
  //   ref: () => "Contact",
  //   type: () => [Schema.Types.ObjectId],
  //   validate: UserValidations.contactsValidate(),
  //   default: () => [],
  // })
  // public contacts!: Ref<Contact>[];

  @prop({ required: false, type: Number, default: 3 })
  public attempts!: number;

  @prop({ required: false, type: Boolean, default: false })
  public blocked!: boolean;

  @prop({ required: false, type: Boolean, default: false })
  public active!: boolean;
}

export class Group {
  @prop({
    required: true,
    type: String,
    validate: GroupValidation.nameValidate(),
  })
  public name!: string;

  @prop({
    required: false,
    type: String,
    validate: GroupValidation.descriptionValidate(),
  })
  public description!: string;

  @prop({ required: false, type: Number })
  public maxContacts!: number;

  @prop({ ref: User, required: true, type: String })
  public idUser!: Ref<User>;
}

export class Contact {
  @prop({
    required: true,
    type: String,
    validate: ContactValidations.nameValidate(),
  })
  public name!: string;

  @prop({
    required: false,
    type: String,
    validate: ContactValidations.emailValidate(),
  })
  public email?: string;

  @prop({
    required: true,
    type: [String],
    validate: ContactValidations.numberValidate(),
  })
  public number!: Array<string>;

  @prop({ ref: User, required: true, type: String })
  public idUser!: Ref<User>;

  @prop({
    required: false,
    type: String,
    validate: ContactValidations.imageValidate(),
    default: Constants.IMAGE_DEFAULT,
  })
  public image?: string;
}

export class GroupContact {
  @prop({ ref: Group, required: true, type: String })
  public idGroup!: Ref<Group>;

  @prop({ ref: Contact, required: true, type: String })
  public idContact!: Ref<Contact>;
}

export class ActivateCode {
  @prop({ required: true, type: String })
  public code!: string;

  @prop({ required: true, type: String })
  public idUser!: string;

  @prop({ default: Date.now, type: Date })
  public createdAt?: Date;

  @prop({ expires: 7200, type: Date })
  public expireAt?: Date;
}
