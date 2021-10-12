import { NextFunction, Request, Response } from 'express';
import { httpStatus } from '../../utils/httpCodes';
import FindAllUsers from '../interfaces/dtos/findAllUsers.dto';
import UserService from '../interfaces/userService.interface';

export default class UserController {
  constructor(private userService: UserService) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params: FindAllUsers = req.body;
      const usersList = await this.userService.findAllUsers(params);
      return res.status(httpStatus.OK).json(usersList);
    } catch ({ errType, errMessage }) {
      res.locals.errType = errType;
      res.locals.errMessage = errMessage;
      return next();
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await this.userService.findUser(id);
      return res.status(httpStatus.OK).json(user);
    } catch ({ errType, message }) {
      res.locals.errType = errType;
      res.locals.errMessage = message;
      return next();
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      const newUserSuccess = await this.userService.createUser(user);
      return res.status(httpStatus.CREATED).json(newUserSuccess);
    } catch ({ errType, message }) {
      res.locals.errType = errType;
      res.locals.errMessage = message;
      return next();
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = req.body;

      const userUpdated = await this.userService.updateUser({ id, ...user });
      return res.status(httpStatus.OK).json(userUpdated);
    } catch ({ errType, message }) {
      res.locals.errType = errType;
      res.locals.errMessage = message;
      return next();
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.userService.removeUser(id);
      return res.status(httpStatus.OK).json();
    } catch ({ errType, message }) {
      res.locals.errType = errType;
      res.locals.errMessage = message;
      return next();
    }
  };
}
