import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../models/Category';

import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.post('/categories', async (request: Request, response: Response) => {
  const { name, parent_id } = request.body;

  const categoriesRepository = getRepository(Category);

  const category = await categoriesRepository.create({ name, parent_id });

  await categoriesRepository.save(category);

  return response.status(200).json(category);
});

routes.get('/categories', async (request: Request, response: Response) => {
  const categoriesRepository = getRepository(Category);

  const categories = await categoriesRepository.find({
    relations: ['parent', 'children']
  });

  return response.status(200).json(categories);
});

export default routes;
