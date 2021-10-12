export default class CustomError extends Error {
  errType: string;

  constructor(message: string, errType: string) {
    super(message);
    this.errType = errType;
  }
}
