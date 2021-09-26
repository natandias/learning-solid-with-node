import { Request, Response } from 'express';
import UserService from '../interfaces/userService.interface';

export default class UserController {
  constructor(private userService: UserService) {}

  list = (req: Request, res: Response) => {
    const usersList = this.userService.findAllUsers();
    return res.json(usersList).status(200);
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = this.userService.findUser(id);
    return res.json(user).status(202);
  };

  create = (req: Request, res: Response) => {
    const user = req.body;
    const newUserSuccess = this.userService.createUser(user);
    return res.json(newUserSuccess).status(201);
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.body;

    this.userService.updateUser({ id, ...user });
    return res.json().status(202);
  };

  remove = (req: Request, res: Response) => {
    const { id } = req.params;
    this.userService.removeUser(id);
    return res.json().status(202);
  };
}
