import jwt from "jsonwebtoken";

import { JWT_KEY } from "../config";

export const sign = (data: any) => {
  return jwt.sign(data, JWT_KEY);
};

export const verify = (jwtSignedData: string) => {
  return jwt.verify(jwtSignedData, JWT_KEY);
};
