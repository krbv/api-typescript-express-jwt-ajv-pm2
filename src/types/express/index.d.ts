import { IRequestState } from "../../interfaces/express.interface.js";

declare module "express-serve-static-core" {
  interface Request {
    state?: IRequestState;
  }
}
