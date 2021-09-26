import { Router } from 'express';
import userFactory from './index';

const UserRoutes = Router();

const userController = userFactory();

UserRoutes.get('/', userController.list);
UserRoutes.get('/:id', userController.findOne);
UserRoutes.post('/', userController.create);
UserRoutes.patch('/:id', userController.update);
UserRoutes.delete('/:id', userController.remove);

export default UserRoutes;
