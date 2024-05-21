import jwt from "jsonwebtoken";
import { GenerateTokenData, JWTManagerProps } from "../types";

class JWTManager {
  private SECRET_WORD: string;
  public expiresIn: string;

  constructor({ SECRET_WORD, expiresIn = "2h" }: JWTManagerProps) {
    this.SECRET_WORD = SECRET_WORD;
    this.expiresIn = expiresIn;
  }

  generateToken(props: GenerateTokenData) {
    const { id, userName, email } = props;
    return jwt.sign({ id, userName, email }, this.SECRET_WORD, {
      expiresIn: this.expiresIn,
    });
  }
}

export default JWTManager;
