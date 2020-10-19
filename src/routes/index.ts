import { Router } from 'express';

import usersRouter from './users.routes';
import categoriesRouter from './categories.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
