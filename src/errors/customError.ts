import {
  ICustomError,
  ICustomErrorConstructor,
} from "../interfaces/customError.interface.js";

export default class CustomError extends Error implements ICustomError {
  public statusCode = 500;
  public errorMessage = "Something went wrong";
  public errorDescription = "";

  constructor({
    name,
    fn,
    message,
    statusCode,
    errorMessage,
    errorDescription,
  }: ICustomErrorConstructor) {
    super(message);
    Error.captureStackTrace(this, fn);
    Object.setPrototypeOf(this, fn.prototype);
    statusCode && (this.statusCode = statusCode);
    errorMessage && (this.errorMessage = errorMessage);
    errorDescription && (this.errorDescription = errorDescription);
    this.name = name;
  }
}
