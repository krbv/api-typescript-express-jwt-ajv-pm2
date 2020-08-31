import { Handler } from "express";
import { IRequestState } from "./express.interface";

export interface IActionParams {
  body: any;
  params: any;
  headers: any;
  state?: IRequestState | {};
}

export interface IRoute {
  path: string;
  method?: "get" | "post" | "put" | "delete";
  middlewares?: Handler[];
  validationSchema?: object;
  action: (data: IActionParams) => any;
}

export interface IController {
  routes: () => IRoute[];
  middlewares?: () => Handler[];
}
