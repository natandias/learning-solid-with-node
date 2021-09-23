import { Router } from 'express';
import UserController from './user.controller';

const UserRoutes = Router();

const userController = new UserController();

UserRoutes.get('/', userController.list);
UserRoutes.get('/:id', userController.findOne);
UserRoutes.post('/', userController.create);
UserRoutes.patch('/:id', userController.update);
UserRoutes.delete('/:id', userController.remove);

export default UserRoutes;
