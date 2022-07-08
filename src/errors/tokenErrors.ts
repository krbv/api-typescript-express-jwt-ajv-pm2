import CustomError from "./customError.js";

export class TokenNotProvdedTokenError extends CustomError {
  constructor() {
    super({
      name: "TokenNotProvded",
      statusCode: 422,
      errorMessage: "Token not provided",
      fn: TokenNotProvdedTokenError,
    });
  }
}

export class InvalidTokenError extends CustomError {
  constructor() {
    super({
      name: "InvalidToken",
      statusCode: 422,
      errorMessage: "Token not valid",
      fn: InvalidTokenError,
    });
  }
}

export class UidNotFoundTokenError extends CustomError {
  constructor() {
    super({
      name: "UidNotFound",
      statusCode: 422,
      errorMessage: "UID not found",
      fn: UidNotFoundTokenError,
    });
  }
}
