import { getRepository } from 'typeorm';

import Product from '../models/Products';
import Category from '../models/Category';
import AppError from '../errors/AppError';

interface CharacteristicDataType {
  name: string;
  description: string;
}

interface IRequest {
  name: string;
  quantity: number;
  price: number;
  category_id: number;
  characteristics: CharacteristicDataType[];
}

// 5 pontos de carga intrísica
export default class CreateProductService {
  public async execute({
    name,
    quantity,
    price,
    category_id,
    characteristics
  }: IRequest): Promise<Product> {
    const productsRepository = getRepository(Product);
    const categoryRepository = getRepository(Category);

    const productCategory = categoryRepository.findOne(category_id);

    if (productCategory) {
      throw new AppError('Category not found.', 401);
    }

    const set = new Set();

    for (let value of characteristics) {
      if (set.has(value.name)) {
        throw new AppError(`Characteristic ${value.name} cannot be the same`, 400);
      }

      set.add(value.name.toLowerCase());
    }

    const product = productsRepository.create({
      name,
      quantity,
      price,
      category_id,
      characteristics
    });

    await productsRepository.save(product);

    return product;
  }
}
