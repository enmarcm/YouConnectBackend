import { Request, Response } from "express";
import { ContactInterface } from "../types";
import ContactModelClass from "../models/ContactModelClass";
import { Constants } from "../enums";

class ContactController {
  static async mainContact(_req: Request, res: Response) {
    return res.json("Hello from ContactController");
  }

  static async createContact(req: Request, res: Response) {
    //TODO: HAY QUE HACER UN METODO PARA VERIFICAR QUE NO EXISTE YA
    try {
      const { body, idUser } = req as any;

      const {
        name,
        email,
        number,
        image = Constants.IMAGE_DEFAULT,
      } = body as ContactInterface;

      const newContact = await ContactModelClass.createContact({
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
      return newContact;
    } catch (error) {
      console.error(`Error creating contact: ${error}`);
      return res
        .status(500)
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
        .status(500)
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
        .status(500)
        .json({ error: `Error getting all contacts: ${error}` });
    }
  }

  static async updateContact(req: Request, res: Response) {
    try {
      const { body } = req;

      const { id, contact } = body;

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
        .status(500)
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
        .status(500)
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
        .status(500)
        .json({ error: `Error getting contacts by user id: ${error}` });
    }
  }
}

export default ContactController;
