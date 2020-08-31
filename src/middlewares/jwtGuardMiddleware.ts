import { Request, Response, NextFunction } from "express";
import {
  TokenNotProvdedTokenError,
  UidNotFoundTokenError,
  InvalidTokenError,
} from "../errors/tokenErrors";
import { verify } from "../util/jwt";
import { IJwtPayloadVerify } from "../interfaces/auth.interface";

const jwtGuardMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers;

  if (!token) {
    return next(new TokenNotProvdedTokenError());
  }

  try {
    const payload = <IJwtPayloadVerify>verify(`${token}`);
    if (!payload.uid) {
      return next(new UidNotFoundTokenError());
    }
  } catch (e) {
    return next(new InvalidTokenError());
  }

  next();
};

export default jwtGuardMiddleware;
