export interface ICustomError {
  statusCode: number;
  errorMessage: string;
  name: string;
  errorDescription?: string;
}

export interface ICustomErrorConstructor {
  name: string;
  fn: Function;
  message?: string;
  statusCode?: number;
  errorMessage?: string;
  errorDescription?: string;
}
