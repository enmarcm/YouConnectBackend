import ContactModelClass from "../models/ContactModelClass";
import GroupsModelClass from "../models/GroupsModelClass";
import { Request, Response } from "express";
import ContactController from "./contactController";

export default class GroupController {
  private static async verifyUserOwnership({
    idUser,
    idGroup,
  }: {
    idUser: string;
    idGroup: string;
  }) {
    try {
      const group = await GroupsModelClass.getInfoGroup({ id: idGroup });

      if ("error" in group)
        throw new Error("Group not found. Error verifying user ownership");

      if (!group || group.idUser !== idUser)
        throw new Error(
          "User is not the owner of the group. Error verifying user ownership"
        );

      return true;
    } catch (error) {
      throw new Error(`Error verifying user ownership: ${error}`);
    }
  }

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

  static async getGroupsByUser(req: Request, res: Response) {
    try {
      const { idUser } = req as any;

      const groups = await GroupsModelClass.getGroupsByUserId({ idUser });

      return res.status(200).json(groups);
    } catch (error) {
      console.error(`Error getting groups by user id: ${error}`);
      return res.status(500).json({ error: "Error getting groups by user id" });
    }
  }

  static async getGroupsByUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const groups = await GroupsModelClass.getGroupsByUserId({ idUser: id });

      return res.status(200).json(groups);
    } catch (error) {
      console.error(`Error getting groups by user id: ${error}`);
      return res.status(500).json({ error: "Error getting groups by user id" });
    }
  }

  static async deleteGroup(req: Request, res: Response) {
    try {
      const { id } = req.params as any;
      const { idUser } = req as any;

      //Verify group exists
      const group = await GroupsModelClass.getInfoGroup({ id });
      if ("error" in group || !group)
        return res.status(404).json({ error: "Group not found" });

      //Veify ownership of the group by the user
      await GroupController.verifyUserOwnership({
        idUser: idUser,
        idGroup: id,
      });

      const deleteGroup = await GroupsModelClass.deleteGroup({ id });

      //Aqui hay que borrar tambien de la otra collecion, la de contactos y grupos
      const deleteGroupContact = await GroupsModelClass.removeGroupContacts({
        idGroup: id,
      });

      const message = {
        message: `Group ${id} deleted successfully`,
        ...deleteGroup,
        ...deleteGroupContact,
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

      //Verify group exists
      const groupExist = await GroupsModelClass.getInfoGroup({ id });
      if ("error" in groupExist || !groupExist)
        return res.status(404).json({ error: "Group not found" });

      //Verify user ownership
      await GroupController.verifyUserOwnership({ idUser, idGroup: id });

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

      // Validar que el ID recibido es correcto
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      // Obtener información del grupo
      const group = await GroupsModelClass.getInfoGroup({ id });
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }

      const contacts = await GroupsModelClass.getContactsByGroupId({ idGroup: id });

      const groupWithContacts = {
        ...group,
        contacts,
      };

      return res.json(groupWithContacts);
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
      const { idUser } = req as any;

      //Hay que verificar que exista el grupo y el contacto
      const group = await GroupsModelClass.getInfoGroup({ id: idGroup });
      if ("error" in group)
        return res.status(404).json({ error: "Group not found" });

      const contact = await ContactModelClass.getContactById({ id: idContact });
      if ("error" in contact)
        return res.status(404).json({ error: "Contact not found" });

      await GroupController.verifyUserOwnership({ idUser: idUser, idGroup });
      await ContactController.verifyUserOwnership({
        idUser: idUser,
        idContact,
      });

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
      const { idUser } = req as any;

      //Verificar que exista el grupo y el contacto
      const group = await GroupsModelClass.getInfoGroup({ id: idGroup });
      if ("error" in group || !group)
        return res.status(404).json({ error: "Group not found" });

      const contact = await ContactModelClass.getContactById({ id: idContact });
      if ("error" in contact || !contact)
        return res.status(404).json({ error: "Contact not found" });

      //Verify owenership of the group
      await GroupController.verifyUserOwnership({ idUser: idUser, idGroup });
      await ContactController.verifyUserOwnership({
        idUser: idUser,
        idContact,
      });

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

  static async getContactsByGroupId(req: Request, res: Response) {
    try {
      const { idGroup } = req.params as any;
      const contacts = await GroupsModelClass.getContactsByGroupId({ idGroup });
      return res.status(200).json(contacts);
    } catch (error) {
      console.error(`Error getting contacts by group id: ${error}`);
      return res
        .status(500)
        .json({ error: "Error getting contacts by group id" });
    }
  }
}
