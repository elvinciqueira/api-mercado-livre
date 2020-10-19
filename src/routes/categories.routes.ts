import { Router } from 'express';

import CategoriesController from '../controllers/CategoriesController';
import validateCategoryCreate from '../middlewares/validators/CategoryStore';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const categoriesController = new CategoriesController();

const categoriesRouter = Router();

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.post('/', validateCategoryCreate, categoriesController.create);
categoriesRouter.get('/', categoriesController.index);

export default categoriesRouter;
