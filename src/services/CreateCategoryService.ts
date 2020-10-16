import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface IRequest {
  name: string;
  parent_id: number;
}

class CreateCategoryService {
  public async execute ({ name, parent_id }: IRequest): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const category = await categoriesRepository.create({ name, parent_id });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
