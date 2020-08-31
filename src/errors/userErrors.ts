import CustomError from "./customError";

export class UserNotFoundError extends CustomError {
  constructor() {
    super({
      name: "UserNotFound",
      statusCode: 422,
      errorMessage: "User not found",
      fn: UserNotFoundError,
    });
  }
}
