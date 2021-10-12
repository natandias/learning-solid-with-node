import { Request, Response } from 'express';
import { httpStatus } from '../utils/httpCodes';

export default function HttpErrorHandler(req: Request, res: Response) {
  const errType = res.locals.errType as keyof typeof httpStatus;
  return res.status(httpStatus[errType]).json(res.locals.errMessage);
}
