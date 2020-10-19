import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsController = new ProductsController();

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);

productsRouter.post('/', productsController.create);
productsRouter.get('/', productsController.index);

export default productsRouter;
