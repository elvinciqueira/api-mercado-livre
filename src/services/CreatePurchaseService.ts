import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Product from '../models/Products';
import Purchase from '../models/Purchase';
import User from '../models/Users';

interface IRequest {
  quantity: number;
  gateway: string;
  product_id: number;
  user_id: number;
}

export default class CreatePurchaseService {
  public async execute({ product_id, gateway, quantity, user_id }: IRequest): Promise<String> {
    const productsRepository = getRepository(Product);
    const usersRepository = getRepository(User);
    const purchaseRepository = getRepository(Purchase);

    const product = await productsRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Product not found.', 400);
    }

    if (quantity <= product.quantity) {
      product.quantity -= quantity;
    }

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users.', 400);
    }

    const question = purchaseRepository.create({
      gateway,
      quantity,
      product_id,
      user_id
    });

    await purchaseRepository.save(question);
    await productsRepository.save(product);

    if (gateway.toLowerCase() === 'paypal') {
      return `paypal.com/${question.id}?redirectUrl=/checkout`
    } else {
      return `pagseguro.com?returnId${question.id}&redirectUrl=/checkout`;
    }
  }
}
