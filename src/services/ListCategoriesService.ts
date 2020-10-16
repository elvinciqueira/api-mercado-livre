import { getRepository } from "typeorm";

import Category from "../models/Category";

class ListCategoriesService {
  public async execute(): Promise<Category[]> {
    const categoriesRepository = getRepository(Category);

    const categories = await categoriesRepository.find({
      relations: ['parent', 'children']
    });

    return categories;
  }
}

export default ListCategoriesService;
