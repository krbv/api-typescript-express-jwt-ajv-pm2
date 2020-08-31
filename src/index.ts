import bodyParser from "body-parser";
import App from "./app";
import AuthController from "./controllers/authController";
import UsersController from "./controllers/usersController";
import { KeyNotProvdedTokenError } from "./errors/keyErrors";
import CustomError from "./errors/customError";
import { PORT } from "./config";

const app = new App({
  controllers: [AuthController, UsersController],
  middlewares: [bodyParser.json, bodyParser.urlencoded],
  urlPrefix: "/api/v1",

  /* Logic for winston, graylog, pm2 */
  onSuccess({ response, req }) {
    console.log(">> Response", response, req.path);
  },

  onError({ error, req }) {
    if (!(error instanceof CustomError)) {
      console.log(error);
      return;
    }

    console.log(">> Error:", error.statusCode, error.errorMessage, req.path);

    if (error instanceof KeyNotProvdedTokenError) {
      //an example how to catch a specific error
    }
  },
});

const server = app.listen(PORT, () => console.log(`App is up on ${PORT}`));

//To help pm2 start new instance
process.on("SIGINT", () => {
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  });
});
