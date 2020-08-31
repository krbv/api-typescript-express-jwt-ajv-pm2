import usersMockup from "../../data/mockup/users";
import jwtGuardMiddleware from "../../middlewares/jwtGuardMiddleware";

import { IController, IRoute } from "../../interfaces/controller.interface";

import { createUserSchema } from "../../schemas/userSchema";
import { IUser } from "../../interfaces/user.interface";
import { UserNotFoundError } from "../../errors/userErrors";
import {
  ICreateUserParams,
  IDeleteUserParams,
  IUpdateUserParams,
} from "../../interfaces/user.interface";

class UsersController implements IController {
  private users: IUser[] = [];

  constructor() {
    //Place to connect models
    this.users = usersMockup;
  }

  routes(): IRoute[] {
    return [
      {
        path: "/users",
        action: this.getAllUsers,
      },
      {
        path: "/users",
        method: "post",
        validationSchema: createUserSchema,
        action: this.createUser,
      },
      {
        path: "/users/:id",
        action: this.updateUser,
        validationSchema: createUserSchema,
        method: "put",
      },
      {
        path: "/users/:id",
        method: "delete",
        action: this.deleteUser,
      },
    ];
  }

  middlewares() {
    return [jwtGuardMiddleware];
  }

  private createUser = ({ body }: ICreateUserParams) => {
    this.users.push({
      id: new Date().valueOf(),
      name: body.name,
    });
  };

  private getAllUsers = () => ({ users: this.users });

  private deleteUser = ({ params }: IDeleteUserParams) => {
    this.users = usersMockup.filter((u) => String(u.id) !== params.id);
  };

  private updateUser = ({ params, body }: IUpdateUserParams) => {
    const user = usersMockup.find((u) => String(u.id) !== params.id);
    if (!user) throw new UserNotFoundError();
    user.name = body.name;
  };
}

export default UsersController;
