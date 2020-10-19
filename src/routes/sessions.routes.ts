import { Router } from 'express';

import SessionController from '../controllers/SessionsController';

const sessionController = new SessionController();

const sessionsRouter = Router();

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
