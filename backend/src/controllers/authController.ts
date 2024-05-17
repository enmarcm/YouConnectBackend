import { Request, Response } from "express";
import { RegisterUser, RegisteredUser, UserInterface } from "../types";
import REGISTER_VALIDATORS from "../schemas/registerValidators";
import { INodeMailer } from "../data/instances";
import CryptManager from "../components/CryptManager";
import { Constants, URLS } from "../enums";
import UserModelClass from "../models/UserModelClass";
import ActivateModelClass from "../models/ActivateModelClass";

class AuthController {
  private static verifyData({ req }: { req: Request }): void {
    const body = req.body as RegisterUser;
    const { userName, email, password, dateOfBirth } = body;

    if (!userName || !email || !password || !dateOfBirth) {
      throw new Error("Missing required fields");
    }

    for (const field in body) {
      if (
        field in REGISTER_VALIDATORS &&
        !REGISTER_VALIDATORS[field]((body as any)[field])
      ) {
        throw new Error(`${field} is not valid!`);
      }
    }
  }

  private static async verifyUser({ req }: { req: Request }): Promise<void> {
    const body = req.body as RegisterUser;
    const { email, userName } = body;

    const data = await UserModelClass.searchUserExist({ userName, email });

    if (data) {
      throw new Error("User or email already exist");
    }
  }

  private static async registerUser({
    req,
  }: {
    req: Request;
  }): Promise<Boolean | Object> {
    try {
      const body = req.body as RegisterUser;

      const userAdded = (await UserModelClass.registerUser({
        userData: body,
      })) as UserInterface;

      //Generate hash
      const code = CryptManager.generateRandom();

      //Add verification code to Database
      await UserModelClass.addActivateCode({ code, idUser: userAdded?._id });

      return { data: userAdded, code };
    } catch (error) {
      console.error(`Error registering user: ${error}`);
      return false;
    }
  }

  //TODO: Esto hay que hacerlo mejor en el modelo
  private static async sendVerificationMail({
    userData,
    code,
  }: {
    userData: RegisterUser;
    code: string;
  }): Promise<Boolean> {
    try {
      const htmlContent = `
        <div style="text-align: center; font-family: Arial, sans-serif;">
          <h1 style="color: #008080;">YouConnect</h1>
          <p style="font-size: 1.2em;">Thank you for registering with us!</p>
          <p style="font-size: 1.2em;">Please click the button below to activate your account.</p>
          <a href="${URLS.ACTIVATE_USER}/${code}" style="display: inline-block; background-color: #008080; color: #ffffff; padding: 10px 20px; text-decoration: none; font-size: 1.5em; margin: 20px auto; border-radius: 5px;">Activate Account</a>
        </div>
      `;

      INodeMailer.sendMailHtml({
        to: userData.email,
        subject: "Activate your account",
        html: htmlContent,
      });

      return true;
    } catch (error) {
      console.error(`Error sending verification mail: ${error}`);
      return false;
    }
  }

  public static async activateUser(req: Request, res: Response) {
    try {
      const { code } = req.params;

      // Buscar el activationRecord
      const activationRecord = await ActivateModelClass.searchOneActivation({
        code,
      });

      if (!activationRecord)
        return res.json({ error: "Activation record not found" });

      // Buscar el usuario asociado con el activationRecord

      const id = activationRecord.idUser;
      const user = await UserModelClass.searchUserId({ id });

      if (!user) return res.json({ error: "User not found" });

      // Cambiar la propiedad activate del usuario a true
      const updatedUser = await UserModelClass.activateUser({ id });

      if (Constants.ERROR in updatedUser)
        return res.json({ error: "Error activating user" });

      // Eliminar el activationRecord
      const deletedRecord = await ActivateModelClass.removeActivateDocument({
        idActivation: activationRecord._id,
      });

      if (Constants.ERROR in deletedRecord)
        return res.json({ error: "Error deleting activation record" });

      return res.json({ message: "User activated successfully" });
    } catch (error) {
      console.error(error);
      return res.json({ error: "Error activating user" });
    }
  }

  public static async register(req: Request, res: Response) {
    try {
      AuthController.verifyData({ req });
      await AuthController.verifyUser({ req });

      const data = (await AuthController.registerUser({
        req,
      })) as RegisteredUser;

      const isMailSent = await AuthController.sendVerificationMail({
        userData: data?.data,
        code: data?.code,
      });
      if (!isMailSent) {
        throw new Error("Error sending verification mail");
      }

      return res.status(201).json({
        message: "User registered successfully, please activate your account",
      });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  //! PRIVADA Verificar que el usuario existe y que cumpla con la REGEX
  static async verifyLoginData({ userName }: { userName: string }) {
    try {
      const result = await UserModelClass.searchUserExist({ userName });

      if (!result) return false;

      return result._id;
    } catch (error) {
      return { error };
    }
  }

  //! PRIVADA Este se encarga de verificar si el usuario esta bloqueado
  static async verifyBlockUser({
    userData,
  }: {
    userData: UserInterface;
  }): Promise<Boolean> {
    try {
      return userData.blocked;
    } catch (error) {
      throw new Error(`New error: ${error}`);
    }
  }

  //! PRIVADA Este verifica que la contraseña es correcta
  static async verifyPassword({
    userData,
    passwordSend,
  }: {
    userData: UserInterface;
    passwordSend: string;
  }) {
    try {
      const { password } = userData;

      const result = await CryptManager.compareBcrypt({
        data: passwordSend,
        hash: password,
      });

      return result;
    } catch (error) {
      throw new Error(`New error: ${error}`);
    }
  }

  //! PRIVADA Este baja los intentos si se equivoca
  static async decreaseAttempts({ id }: { id: string }) {
    try {
      const result = await UserModelClass.decreaseAttempts({ id });

      return result;
    } catch (error) {
      throw new Error(`New error: ${error}`);
    }
  }

  //Este se encarga de bloquear al usuario
  // private static async blockUser({ req }: { Req: Request }) {}

  //Este se encarga de desbloquear al usuario
  // private static async unblockUser({ req }: { Req: Request }) {}

  //Este se encarga de hacer el login
  // public static async login({ req, res }: ReqRes) {}
}

export default AuthController;
