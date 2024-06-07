import { Request, Response } from "express";
import { ContactInterface } from "../types";
import ContactModelClass from "../models/ContactModelClass";
import { Constants } from "../enums";

class ContactController {
  static async mainContact(_req: Request, res: Response) {
    return res.json("Hello from ContactController");
  }

  static async createContact(req: Request, res: Response) {
    try {
      const { body, idUser } = req as any;

      const {
        name,
        email,
        number,
        image = Constants.IMAGE_DEFAULT,
      } = body as ContactInterface;


      // Ensure number is an array      
      const newNumber = Array.isArray(number) ? number : [number];

      // Verify if contact name or number already exists in the same user
      await ContactController.verifyContactUniqueness({ idUser, name, number: newNumber });

      const newContact = await ContactModelClass.createContact({
        idUser,
        name,
        email,
        number: newNumber,
        image,
      });

      return res.json({
        message: "Created new contact successfully",
        newContact,
      });
    } catch (error) {
      console.error(`Error creating contact: ${error}`);
      return res
        .status(400)
        .json({ error: `Error creating contact: ${error}` });
    }
  }

  static async getContactById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const contact = await ContactModelClass.getContactById({ id });

      if (!contact) return res.status(404).json({ error: "Contact not found" });

      return res.json(contact);
    } catch (error) {
      console.error(`Error getting contact by id: ${error}`);
      return res
        .status(400)
        .json({ error: `Error getting contact by id: ${error}` });
    }
  }

  static async getAllContacts(_req: Request, res: Response) {
    try {
      const contacts = await ContactModelClass.getAllContacts();

      return res.json(contacts);
    } catch (error) {
      console.error(`Error getting all contacts: ${error}`);
      return res
        .status(400)
        .json({ error: `Error getting all contacts: ${error}` });
    }
  }

  static async updateContact(req: Request, res: Response) {
    try {
      const { body } = req;

      const { id, contact } = body;

      // Ensure number is an array
      contact.number = Array.isArray(contact.number)
        ? contact.number
        : [contact.number];

      const updatedContact = await ContactModelClass.updateContactById({
        id,
        contact,
      });

      if (!updatedContact)
        return res.status(404).json({ error: "Contact not found" });

      return res.json(updatedContact);
    } catch (error) {
      console.error(`Error updating contact: ${error}`);
      return res
        .status(400)
        .json({ error: `Error updating contact: ${error}` });
    }
  }

  static async deleteContact(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedContact = await ContactModelClass.deleteContactById({ id });

      if (!deletedContact)
        return res.status(404).json({ error: "Contact not found" });

      return res.json({
        message: "Contact deleted successfully",
        deletedContact,
      });
    } catch (error) {
      console.error(`Error deleting contact: ${error}`);
      return res
        .status(400)
        .json({ error: `Error deleting contact: ${error}` });
    }
  }

  static async getContactsByUserId(req: Request, res: Response) {
    try {
      //TODO: MEJORAR ESTO
      //! Se supone que el token
      const { idUser } = req as any;

      const contacts = await ContactModelClass.getAllContactsByUserId({
        idUser,
      });

      if (contacts.length === 0)
        return res.status(404).json({ error: "Contacts not found" });

      return res.json(contacts);
    } catch (error) {
      console.error(`Error getting contacts by user id: ${error}`);
      return res
        .status(400)
        .json({ error: `Error getting contacts by user id: ${error}` });
    }
  }

  static async verifyUserOwnership({
    idUser,
    idContact,
  }: {
    idUser: string;
    idContact: string;
  }) {
    try {
      const contact = await ContactModelClass.getContactById({ id: idContact });

      if (!contact || contact?.idUser !== idUser || "error" in contact)
        throw new Error("Contact not found or not yours");

      return true;
    } catch (error) {
      console.error(
        `Error verifying user ownership: ${error}. In verifyUserOwnership method in ContactController.ts`
      );
      throw new Error(`Error verifying user ownership: ${error}`);
    }
  }

  private static async verifyContactUniqueness({
    idUser,
    name,
    number,
  }: {
    idUser: string;
    name: string;
    number: string | string[];
  }) {
    try {
      // Ensure number is an array
      number = Array.isArray(number) ? number : [number];

      const existingContact =
        await ContactModelClass.getContactByUserAndNameOrNumber({
          idUser,
          name,
          number,
        });

      if (existingContact)
        throw new Error("Contact already exists with the same name or number");

      return true;
    } catch (error) {
      console.error(
        `Error verifying contact uniqueness: ${error}. In verifyContactUniqueness method in ContactController.ts`
      );

      throw new Error(`Error verifying contact uniqueness: ${error}`);
    }
  }
}

export default ContactController;
