import CustomError from "./customError.js";

export class KeyNotProvdedTokenError extends CustomError {
  constructor() {
    super({
      name: "KeyNotFound",
      statusCode: 422,
      errorMessage: "Key not provided",
      fn: KeyNotProvdedTokenError,
    });
  }
}

export class KeyNotFoundTokenError extends CustomError {
  constructor() {
    super({
      name: "KeyNotProvided",
      statusCode: 422,
      errorMessage: "Key not found",
      fn: KeyNotFoundTokenError,
    });
  }
}
