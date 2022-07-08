import CustomError from "./customError.js";

export class NotImplementedError extends CustomError {
  constructor() {
    super({
      name: "NotImplemented",
      statusCode: 501,
      errorMessage: "Not Implemented",
      fn: NotImplementedError,
    });
  }
}
