import { ITSGooseHandler } from "../data/instances";
import { ActivateCodeModel } from "../typegoose/models";

class ActivateModelClass {
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

  static async searchOneActivation({ code }: { code: string }) {
    try {
      const result = await ITSGooseHandler.searchOne({
        Model: ActivateCodeModel,
        condition: { code },
      });

      return result;
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
}

export default ActivateModelClass;
