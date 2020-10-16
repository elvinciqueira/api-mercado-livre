import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Category from '../models/Category';

interface IRequest {
  name: string;
  parent_id: number;
}

// 2 pontos de carga intrísica
class CreateCategoryService {
  public async execute ({ name, parent_id }: IRequest): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const checkCategory = await categoriesRepository.findOne({
      where: { name }
    });

    if (checkCategory) {
      throw new AppError('Category already exists', 400);
    }

    const category = categoriesRepository.create({ name, parent_id });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
