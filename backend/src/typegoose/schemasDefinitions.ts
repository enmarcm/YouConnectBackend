import { prop, Ref } from "@typegoose/typegoose";
import { UserValidations } from "./schemasValidations";

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

  @prop({ required: true, type: String , validate: UserValidations.passwordValidate()})
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

  @prop({
    required: false,
    type: () => [String],
    validate: UserValidations.contactsValidate(),
  })
  public contacts!: Ref<Contact>[];
}

export class Group {
  @prop({ required: true, type: String })
  public name!: string;

  @prop({ required: true, type: String })
  public description!: string;

  @prop({ required: false, type: Number })
  public maxContacts!: number;

  @prop({ ref: User, required: true, type: String })
  public idUser!: Ref<User>;
}

export class Contact {
  @prop({ required: true, type: String })
  public name!: string;

  @prop({ required: true, type: String })
  public email!: string;

  @prop({ required: true, type: String })
  public number!: string;

  @prop({ ref: User, required: true, type: String })
  public idUser!: Ref<User>;

  @prop({ required: false, type: String })
  public image!: string;
}

export class GroupContact {
  @prop({ ref: Group, required: true, type: String })
  public idGroup!: Ref<Group>;

  @prop({ ref: Contact, required: true, type: String })
  public idContact!: Ref<Contact>;
}
