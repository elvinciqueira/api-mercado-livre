import { Router } from 'express';
import UserController from '../controllers/UsersController';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post('/', usersController.create);

export default usersRouter;
