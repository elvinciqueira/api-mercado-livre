import { Router } from 'express';

import usersRouter from './usersRouter.router';

const routes = Router();

routes.use('/users', usersRouter);

export default routes;
