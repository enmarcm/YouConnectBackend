import { ITSGooseHandler } from "../data/instances";
import { ActivateCodeModel } from "../typegoose/models";

class ActivateCodeClass {
  static async removeActivateDocument({
    idActivation,
  }: {
    idActivation: string;
  }) {
    try {
      const result = await ITSGooseHandler.removeDocument({
        Model: ActivateCodeModel,
        id: idActivation,
      });

      return result;
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
}

export default ActivateCodeClass;
