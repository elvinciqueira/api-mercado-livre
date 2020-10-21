import { getRepository } from 'typeorm';

import Product from '../models/Products';
import AppError from '../errors/AppError';
import User from '../models/Users';

interface IRequest {
  user_id: string;
  product_id: string;
}

// 6 de carga intrísica
export default class UpdateImageProductService {
  public async execute({ product_id, images, user_id }: IRequest): Promise<Product | undefined> {
    const productsRepository = getRepository(Product);
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change image.', 403);
    }

    const product = await productsRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Product not found.', 400);
    }

    if (product.user_id != user_id) {
      throw new AppError('You cannot change a product that dont belong to you', 403);
    }

    product.images = images;

    await productsRepository.save(product);

    return product;
  }
}
