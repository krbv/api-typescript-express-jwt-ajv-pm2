import Ajv from "ajv";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../errors/validationErrors";

const validatorMiddleware = (scheme: object) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(scheme);
  const valid = validate(req.body);

  if (valid) {
    return next();
  }

  let errorDescription: string[] = [];

  if (validate.errors && validate.errors.length) {
    errorDescription = validate.errors.map((e) => e.message || "");
  }

  next(new ValidationError(errorDescription.join(", ")));
};

export default validatorMiddleware;
