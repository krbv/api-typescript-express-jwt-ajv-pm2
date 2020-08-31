import { IActionParams } from "./controller.interface";

export interface IGetTokenParams extends IActionParams {
  headers: { authorization: string };
}

export interface IJwtPayloadSign {
  uid: number;
}

export interface IJwtPayloadVerify {
  uid: number;
  iat: number;
}
