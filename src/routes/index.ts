import { Router } from 'express';
import { getRepository } from 'typeorm';

import Product from '../models/Products';

import usersRouter from './users.routes';
import categoriesRouter from './categories.routes';
import sessionsRouter from './sessions.routes';
import productsRouter from './products.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);

// routes.get('/products', async (request, response) => {
//   const productsRepository = getRepository(Product);

//   const product = await productsRepository.find({
//     relations: ['category']
//   });

//   return response.status(200).json(product);
// });

export default routes;
