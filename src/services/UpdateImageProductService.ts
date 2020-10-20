import { getRepository } from 'typeorm';

import Product from '../models/Products';
import AppError from '../errors/AppError';
import User from '../models/Users';

interface IRequest {
  user_id: string;
  product_id: string;
}

export default class UpdateImageProductService {
  public async execute({ product_id, images, user_id }: IRequest): Promise<Product | undefined> {
    const productsRepository = getRepository(Product);
    const usersRepository = getRepository(User);

    const user = usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change image.', 403);
    }

    const product = await productsRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Product not found.', 400);
    }

    product.images = images;

    await productsRepository.save(product);

    return product;
  }
}
