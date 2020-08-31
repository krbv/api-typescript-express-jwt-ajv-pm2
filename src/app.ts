import express, { Handler, Request, Response, NextFunction } from "express";
import { IRoute } from "./interfaces/controller.interface";
import { ICustomError } from "./interfaces/customError.interface";
import {
  IAppConstructor,
  IAppClassConstructor,
  ISendApiError,
  ISentError,
  ISentSuccess,
} from "./interfaces/app.interface";
import validatorMiddleware from "./middlewares/validatorMiddleware";
import { NotImplementedError } from "./errors/generalErrors";
import CustomError from "./errors/customError";

class App {
  private app: express.Application;
  private urlPrefix: string;
  private onErrorCb: (params: ISentError) => void;
  private onSuccessCb: (params: ISentSuccess) => void;

  constructor({
    controllers,
    middlewares,
    urlPrefix,
    onError,
    onSuccess,
  }: IAppConstructor) {
    this.nextErrorMiddleware = this.nextErrorMiddleware.bind(this);
    this.app = express();
    this.urlPrefix = urlPrefix || "/";
    middlewares?.length && this.initMiddlewares(middlewares);
    controllers?.length && this.initControllers(controllers);

    this.setNotFoundMiddleware();
    this.app.use(this.nextErrorMiddleware);

    this.onErrorCb = onError;
    this.onSuccessCb = onSuccess;
  }

  public listen(port: number | string, cb?: () => void) {
    return this.app.listen(port, cb);
  }

  private initMiddlewares(middlewares: (() => Handler)[]) {
    middlewares.forEach((mw) => this.app.use(mw()));
  }

  private initControllers(controllers: IAppClassConstructor[]) {
    controllers.forEach((controller) => {
      const service = this.serviceFactory(controller);
      this.initService(
        service.routes(),
        service.middlewares ? service.middlewares() : []
      );
    });
  }

  private initService(routes: IRoute[], middlewares: Handler[]) {
    routes.forEach((route) => {
      this.app[route.method || "get"](
        `${this.urlPrefix}${route.path}`,
        this.setRouteMiddlewares(route, middlewares),
        async (req: Request, res: Response) => {
          try {
            const state = req.state || {};
            const data = await route.action({
              body: req.body,
              params: req.params,
              headers: req.headers,
              state,
            });
            this.sendData(data, req, res);
          } catch (error) {
            this.sendError(error, req, res);
          }
        }
      );
    });
  }

  private setRouteMiddlewares(route: IRoute, middlewares: Handler[]) {
    const mergedMiddlewares = [...middlewares];

    if (route.middlewares) {
      mergedMiddlewares.push(...route.middlewares);
    }

    if (route.validationSchema) {
      mergedMiddlewares.push(validatorMiddleware(route.validationSchema));
    }

    return mergedMiddlewares;
  }

  private nextErrorMiddleware(
    err: ICustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    this.sendError(err, req, res);
  }

  private setNotFoundMiddleware() {
    this.app.use("*", (req: Request, res: Response, next: NextFunction) => {
      next(new NotImplementedError());
    });
  }

  private sendData(data: any, req: Request, res: Response) {
    const response = {
      status: "ok",
      ...(typeof data === "object" ? data : { data }),
    };
    res.send(response);
    this.onSuccessCb({
      response,
      req,
    });
  }

  private sendError(error: Error | ICustomError, req: Request, res: Response) {
    const apiError: ISendApiError = {
      error: {
        code: 500,
        message: "Something went wrong",
      },
    };
    if (error instanceof CustomError) {
      apiError.error.code = error.statusCode;
      apiError.error.message = error.errorMessage;
      apiError.error.description = error.errorDescription || undefined;
    }

    res.status(apiError.error.code).send(apiError);
    this.onErrorCb({ error, req });
  }

  private serviceFactory(Service: IAppClassConstructor) {
    return new Service();
  }
}

export default App;
