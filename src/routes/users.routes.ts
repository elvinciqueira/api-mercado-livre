import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import validateUserCreate from '../middlewares/validators/UserStore';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post('/', validateUserCreate, usersController.create);

export default usersRouter;
