import { Router } from 'express';

import CategoriesController from '../controllers/CategoriesController';
import validateCategoryCreate from '../middlewares/validators/CategoryStore';

const categoriesController = new CategoriesController();

const categoriesRouter = Router();

categoriesRouter.post('/', validateCategoryCreate, categoriesController.create);
categoriesRouter.get('/', categoriesController.index);

export default categoriesRouter;
