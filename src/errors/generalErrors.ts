import CustomError from "./customError";

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
