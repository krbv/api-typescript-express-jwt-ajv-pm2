import { IActionParams } from "./controller.interface.js";

export interface IUser {
  id: number;
  name: String;
}

export interface ICreateUserParams extends IActionParams {
  body: { name: string; };
}

export interface IDeleteUserParams extends IActionParams {
  params: { id: string; };
}

export interface IUpdateUserParams extends IActionParams {
  params: { id: string; };
  body: { name: string; };
}
