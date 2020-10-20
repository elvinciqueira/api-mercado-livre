import { getRepository } from 'typeorm';

import Product from '../models/Products';
import AppError from '../errors/AppError';

interface IRequest {
  product_id: string;
}

export default class UpdateImageProductService {
  public async execute({ product_id, images }: IRequest): Promise<Product | undefined> {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Product not found.', 400);
    }

    product.images = images

    await productsRepository.save(product);

    return product;
  }
}
