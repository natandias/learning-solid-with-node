import { Request, Response } from 'express';

export default class UserController {
  async list(req: Request, res: Response) {
    return res.send('Users List');
  }

  async findOne(req: Request, res: Response) {
    return res.send('Users FindOne');
  }

  async create(req: Request, res: Response) {
    return res.send('Users Create');
  }

  async update(req: Request, res: Response) {
    return res.send('Users Update');
  }

  async remove(req: Request, res: Response) {
    return res.send('Users Remove');
  }
}
