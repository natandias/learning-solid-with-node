import { Router } from 'express';
import UserRoutes from './users/user.routes';
// New routes are automatically imported here by plop (don't remove this comment)

const routes = Router();

routes.use('/users', UserRoutes);
// New routes are added automatically here by plop (don't remove this comment)

export default routes;
