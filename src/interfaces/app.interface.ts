import { Handler, Request } from "express";
import { IController } from "./controller.interface.js";
import { ICustomError } from "./customError.interface.js";

export interface IAppClassConstructor {
  new(): IController;
}

export interface ISentSuccess {
  response?: any;
  req: Request;
}
export interface ISentError {
  error: ICustomError | Error;
  req: Request;
}

export interface IAppConstructor {
  controllers: IAppClassConstructor[];
  middlewares: (() => Handler)[];
  urlPrefix: string;
  onError: (params: ISentError) => void;
  onSuccess: (params: ISentSuccess) => void;
}

export interface ISendApiError {
  error: {
    code: number;
    message: string;
    description?: string;
  };
}
