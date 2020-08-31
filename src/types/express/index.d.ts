import { IRequestState } from "../../interfaces/express.interface";

declare module "express-serve-static-core" {
  interface Request {
    state?: IRequestState;
  }
}
