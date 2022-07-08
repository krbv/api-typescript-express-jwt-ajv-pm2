import { IController, IRoute } from "../../interfaces/controller.interface.js";
import { IJwtPayloadSign } from "../../interfaces/auth.interface.js";

import { sign } from "../../util/jwt.js";

import {
  KeyNotProvdedTokenError,
  KeyNotFoundTokenError,
} from "../../errors/keyErrors.js";

import apiKeys from "../../data/mockup/apiKeys.js";
import { IGetTokenParams } from "../../interfaces/auth.interface.js";

class AuthController implements IController {
  protected apiKeys = apiKeys;

  routes(): IRoute[] {
    return [
      {
        path: "/auth",
        method: "post",
        action: this.getToken,
      },
    ];
  }

  private getToken = ({ headers }: IGetTokenParams) => {
    const bearer = "Bearer ";
    const { authorization } = headers;

    if (!(authorization && authorization.indexOf(bearer) === 0)) {
      throw new KeyNotProvdedTokenError();
    }

    const key = authorization.slice(bearer.length);
    const foundKey = this.apiKeys.find((k) => k.key === key);

    if (!foundKey) {
      throw new KeyNotFoundTokenError();
    }

    const jwtPayload: IJwtPayloadSign = {
      uid: foundKey.uid,
    };

    return { token: sign(jwtPayload) };
  };
}

export default AuthController;
