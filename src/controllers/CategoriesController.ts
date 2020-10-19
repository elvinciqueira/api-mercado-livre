import { Request, Response } from 'express';

import CreateCategoryService from '../services/CreateCategoryService';
import ListCategoriesService from '../services/ListCategoriesService';

// 3 pontos de carga intrísica
export default class CategoriesController {
  public async index (request: Request, response: Response) {
    const listCategories = new ListCategoriesService();

    const categories = await listCategories.execute();

    return response.status(200).json(categories);
  }

  public async create(request: Request, response: Response) {
    const { name, parent_id } = request.body;

    const createCategory = new CreateCategoryService();

    const category = await createCategory.execute({ name, parent_id });

    return response.status(200).json(category);
  }
}
