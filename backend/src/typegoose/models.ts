import { ITSGooseHandler } from "../data/instances";
import {
  User,
  Group,
  Contact,
  GroupContact,
} from "../typegoose/schemasDefinitions";

const UserModel = ITSGooseHandler.createModel<User>({ clazz: User });

const GroupModel = ITSGooseHandler.createModel<Group>({ clazz: Group });

const ContactModel = ITSGooseHandler.createModel<Contact>({ clazz: Contact });

const GroupContactModel = ITSGooseHandler.createModel<GroupContact>({
  clazz: GroupContact,
});


export { UserModel, GroupModel, ContactModel, GroupContactModel };
