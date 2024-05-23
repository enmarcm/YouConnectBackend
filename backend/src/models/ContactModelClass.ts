import { ITSGooseHandler } from "../data/instances";
import { ContactModel } from "../typegoose/models";
import { ContactInterface, UpdateContactModelInterface } from "../types";

class ContactModelClass {
  static async getAllContacts() {
    try {
      const contacts = await ITSGooseHandler.searchAll({ Model: ContactModel });
      return contacts;
    } catch (error) {
      throw new Error(`Error getting all contacts: ${error}`);
    }
  }

  static async getContactById({ id }: { id: string }) {
    try {
      const contact = await ITSGooseHandler.searchId({
        Model: ContactModel,
        id,
      });
      return contact;
    } catch (error) {
      throw new Error(`Error getting contact by id: ${error}`);
    }
  }

  static async getAllContactsByUserId({ idUser }: { idUser: string }) {
    try {
      const contactsUser = await ITSGooseHandler.searchRelations({
        Model: ContactModel,
        id: idUser,
        relationField: "idUser",
        onlyId: true,
        transform: (doc: any) => {
          const { idUser, ...rest } = doc;
          return rest;
        },
      });

      if (contactsUser.length === 0 || "error" in contactsUser) return [];

      return contactsUser as Array<ContactInterface>;
    } catch (error) {
      console.error(
        `Error getting all contacts by user id: ${error} in getAllContactsByUserId method in ContactModelClass.ts`
      );
      throw new Error(`Error getting all contacts by user id: ${error}`);
    }
  }

  static async createContact(contact: ContactInterface) {
    try {
      const numbers = Array.isArray(contact.number)
        ? contact.number
        : [contact.number];

      const contactParsed: ContactInterface = {
        ...contact,
        number: numbers,
      };

      const newContact = await ITSGooseHandler.addDocument({
        Model: ContactModel,
        data: contactParsed,
      });

      if ("error" in newContact)
        throw new Error(`Error creating contact: ${newContact.error}`);

      return newContact;
    } catch (error) {
      console.error(
        `Error creating contact: ${error}. in createContact method in ContactModelClass.ts`
      );
      throw new Error(`Error creating contact: ${error}`);
    }
  }

  static async updateContactById({ id, contact }: UpdateContactModelInterface) {
    try {
      const numbers = Array.isArray(contact.number)
        ? contact.number
        : [contact.number];

      const contactParsed: ContactInterface = {
        ...contact,
        number: numbers,
      };

      const updatedContact = await ITSGooseHandler.editDocument({
        Model: ContactModel,
        id,
        newData: contactParsed,
      });
      return updatedContact;
    } catch (error) {
      console.error(
        `Error updating contact by id: ${error}. in updateContactById method in ContactModelClass.ts`
      );
      throw new Error(`Error updating contact by id: ${error}`);
    }
  }

  static async deleteContactById({ id }: { id: string }) {
    try {
      const deletedContact = await ITSGooseHandler.removeDocument({
        Model: ContactModel,
        id,
      });

      //TODO: Hay que borrar al contacto de todos los grupos en que este
      return deletedContact;
    } catch (error) {
      console.error(
        `Error deleting contact by id: ${error}. in deleteContactById method in ContactModelClass.ts`
      );
      throw new Error(`Error deleting contact by id: ${error}`);
    }
  }

  static async deleteAllContactsByUserId({ idUser }: { idUser: string }) {
    try {
      const result = await ITSGooseHandler.removeAllDocumentsByCondition({
        Model: ContactModel,
        condition: { idUser },
      });

      if ("error" in result) {
        console.error(result.error);
        return [];
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new Error(
        `Error deleting all contacts by user id: ${error} in deleteAllContactsByUserId method in ContactModelClass.ts`
      );
    }
  }

  static async getContactByUserAndNameOrNumber({
    idUser,
    name,
    number,
  }: {
    idUser: string;
    name: string;
    number: string[];
  }) {
    try {
      const contact = await ITSGooseHandler.searchOne({
        Model: ContactModel,
        condition: { idUser, $or: [{ name }, { number: { $in: number } }] },
      });

      return contact;
    } catch (error) {
      console.error(
        `Error getting contact by user and name or number: ${error}. in getContactByUserAndNameOrNumber method in ContactModelClass.ts`
      );
      throw new Error(
        `Error getting contact by user and name or number: ${error}`
      );
    }
  }
}

export default ContactModelClass;
