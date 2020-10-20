import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/multer';

import ProductImageController from '../controllers/ProductImageController';
import ProductsController from '../controllers/ProductsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsController = new ProductsController();
const productImageController = new ProductImageController();

const productsRouter = Router();
const upload = multer(uploadConfig);

productsRouter.use(ensureAuthenticated);

productsRouter.post('/', productsController.create);
productsRouter.get('/', productsController.index);
productsRouter.patch('/', upload.array('images'), productImageController.update);

export default productsRouter;
