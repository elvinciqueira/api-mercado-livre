import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/multer';

import OpinionController from '../controllers/OpinionController';
import ProductImageController from '../controllers/ProductImageController';
import ProductsController from '../controllers/ProductsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import QuestionController from '../controllers/QuestionController';
import PurchaseController from '../controllers/PurchaseController';

import validateProductStore from '../middlewares/validators/ProductStore';
import validateOpinionStore from '../middlewares/validators/OpinionStore';

const productsController = new ProductsController();
const productImageController = new ProductImageController();
const opinionController = new OpinionController();
const questionController = new QuestionController();
const purchaseController = new PurchaseController();

const productsRouter = Router();
const upload = multer(uploadConfig);

productsRouter.use(ensureAuthenticated);

productsRouter.post('/', validateProductStore, productsController.create);
productsRouter.get('/', productsController.index);
productsRouter.patch('/', upload.array('images'), productImageController.update);

productsRouter.post('/:id/opinions', validateOpinionStore, opinionController.create);

productsRouter.post('/:id/questions', questionController.create);

productsRouter.post('/:id/purchase', purchaseController.create);

export default productsRouter;
