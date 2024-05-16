import { ActivateCodeModel, UserModel } from "../typegoose/models";
import { ITSGooseHandler } from "../data/instances";
import { AddActivateCodeParams, RegisterUser } from "../types";

class UserModelClass {
  static async obtainUsers() {
    try {
      const data = await ITSGooseHandler.searchAll({ Model: UserModel });

      return data;
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  static async registerUser({
    userData,
  }: {
    // UserModel: ReturnModelType<ClazzT<User>>;
    userData: RegisterUser;
  }) {
    try {
      //TODO: Falta buscar el tipo del UserModel, que sea compatible con el _id sin modificar la clase
      const result = await ITSGooseHandler.addDocument({
        Model: UserModel,
        data: userData,
      });

      return result;
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  static async addActivateCode({ code, idUser }: AddActivateCodeParams) {
    try {
      //TODO: Buscar el tipo directamente de la instancia de un Activate code model, que sea compatible con el _id sin modificar la clase
      const result = await ITSGooseHandler.addDocument({
        Model: ActivateCodeModel,
        data: { code, idUser },
      });

      return result;
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  static async searchUserExist({
    userName,
    email,
  }: {
    userName: string;
    email: string;
  }) {
    try {
      const data = await ITSGooseHandler.searchOne({
        Model: UserModel,
        condition: { $or: [{ userName }, { email }] },
      });

      return data;
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  static async searchUserId({ id }: { id: string }) {
    try {
      const user = await ITSGooseHandler.searchOne({
        Model: UserModel,
        condition: { _id: id },
      });

      return user;
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  static async activateUser({id}: {id: string}) {
    try {
      const updatedUser = await ITSGooseHandler.editDocument({
        Model: UserModel,
        id,
        newData: {active: true}
      })

      return updatedUser
    } catch (error) {
      console.error(error)
      return {error}
    }
  }
}

export default UserModelClass;
