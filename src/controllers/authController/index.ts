import { IController, IRoute } from "../../interfaces/controller.interface";
import { IJwtPayloadSign } from "../../interfaces/auth.interface";

import { sign } from "../../util/jwt";

import {
  KeyNotProvdedTokenError,
  KeyNotFoundTokenError,
} from "../../errors/keyErrors";

import apiKeys from "../../data/mockup/apiKeys";
import { IGetTokenParams } from "../../interfaces/auth.interface";

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
