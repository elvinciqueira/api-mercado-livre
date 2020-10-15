import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/Users';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const usersRepository = getRepository(User);

  const user = await usersRepository.create({ email, password });

  await usersRepository.save(user);

  return response.status(200).json(user);
});

export default usersRouter;
