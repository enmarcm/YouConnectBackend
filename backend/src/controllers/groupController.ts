import ContactModelClass from "../models/ContactModelClass";
import GroupsModelClass from "../models/GroupsModelClass";
import { Request, Response } from "express";

export default class GroupController {
  static async createGroup(req: Request, res: Response) {
    try {
      const { idUser } = req as any;
      const { name, description, maxContacts = 50 } = req.body as any;

      const group = await GroupsModelClass.createGroup({
        name,
        description,
        idUser,
        maxContacts,
      });

      return res.status(201).json(group);
    } catch (error) {
      console.error(`Error creating group: ${error}`);
      return res.status(500).json({ error: "Error creating group" });
    }
  }

  static async getGroupsByUserId(req: Request, res: Response) {
    try {
      const { idUser } = req as any;

      const groups = await GroupsModelClass.getGroupsByUserId({ idUser });

      return res.status(200).json(groups);
    } catch (error) {
      console.error(`Error getting groups by user id: ${error}`);
      return res.status(500).json({ error: "Error getting groups by user id" });
    }
  }

  static async deleteGroup(req: Request, res: Response) {
    try {
      const { id } = req.params as any;
      const deleteGroup = await GroupsModelClass.deleteGroup({ id });

      //Aqui hay que borrar tambien de la otra collecion, la de contactos y grupos
      const deleteGrouptContact = await GroupsModelClass.removeGroupContacts({
        idGroup: id,
      });

      const message = {
        message: `Group ${id} deleted successfully`,
        ...deleteGroup,
        ...deleteGrouptContact,
      };
      return res.status(204).json(message);
    } catch (error) {
      console.error(`Error deleting group: ${error}`);
      return res.status(500).json({ error: "Error deleting group" });
    }
  }

  static async viewAllGroups(_req: Request, res: Response) {
    try {
      const groups = await GroupsModelClass.viewAllGroups();
      return res.status(200).json(groups);
    } catch (error) {
      console.error(`Error viewing all groups: ${error}`);
      return res.status(500).json({ error: "Error viewing all groups" });
    }
  }

  static async updateGroup(req: Request, res: Response) {
    try {
      const { id } = req.params as any;
      const { name, description, maxContacts } = req.body as any;
      const { idUser } = req as any;

      const group = await GroupsModelClass.updateGroup({
        id,
        newGroupData: {
          idUser,
          name,
          description,
          maxContacts,
        },
      });

      return res.status(200).json(group);
    } catch (error) {
      console.error(`Error updating group: ${error}`);
      return res.status(500).json({ error: "Error updating group" });
    }
  }

  static async getInfoGroup(req: Request, res: Response) {
    try {
      const id = req.params.id;
      //TODO: Validar que el ID recibido es correcto

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const group = await GroupsModelClass.getInfoGroup({ id });
      return res.json(group);
    } catch (error) {
      console.error(`Error getting group info: ${error}`);
      return res.status(500).json({ error: "Error getting group info" });
    }
  }

  static async getGroupsByContactId(req: Request, res: Response) {
    try {
      const { idContact } = req.params as any;
      const groups = await GroupsModelClass.getGroupsByContactId({ idContact });
      return res.status(200).json(groups);
    } catch (error) {
      console.error(`Error getting groups by contact id: ${error}`);
      return res
        .status(500)
        .json({ error: "Error getting groups by contact id" });
    }
  }

  static async addContactToGroup(req: Request, res: Response) {
    try {
      const { idGroup, idContact } = req.body as any;

      //Hay que verificar que exista el grupo y el contacto
      const group = await GroupsModelClass.getInfoGroup({ id: idGroup });
      if ("error" in group)
        return res.status(404).json({ error: "Group not found" });

      const contact = await ContactModelClass.getContactById({ id: idContact });
      if ("error" in contact)
        return res.status(404).json({ error: "Contact not found" });

      console.log(group, contact);
      const groupContact = await GroupsModelClass.addContactToGroup({
        idGroup,
        idContact,
      });
      return res.status(201).json(groupContact);
    } catch (error) {
      console.error(`Error adding contact to group: ${error}`);
      return res.status(500).json({ error: "Error adding contact to group" });
    }
  }

  static async removeContactFromGroup(req: Request, res: Response) {
    try {
      const { idGroup, idContact } = req.body as any;

      //Verificar que exista el grupo y el contacto
      const group = await GroupsModelClass.getInfoGroup({ id: idGroup });
      if ("error" in group)
        return res.status(404).json({ error: "Group not found" });

      const contact = await ContactModelClass.getContactById({ id: idContact });
      if ("error" in contact)
        return res.status(404).json({ error: "Contact not found" });

      
      const groupContact = await GroupsModelClass.removeContactFromGroup({
        idGroup,
        idContact,
      });
      return res.status(204).json(groupContact);
    } catch (error) {
      console.error(`Error removing contact from group: ${error}`);
      return res
        .status(500)
        .json({ error: "Error removing contact from group" });
    }
  }
}
