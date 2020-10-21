import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Opinion from '../models/Opinion';

import Product from '../models/Products';
import User from '../models/Users';

interface IRequest {
  grade: number;
  title: string;
  description: string;
  user_id: number;
  product_id: number;
}

export default class CreateOpinionService {
  public async execute({
    description,
    product_id,
    user_id,
    title,
    grade
  }: IRequest): Promise<Opinion> {
    const productsRepository = getRepository(Product);
    const usersRepository = getRepository(User);
    const opinionsRepository = getRepository(Opinion);

    const product = await productsRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Product not found.', 400);
    }

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users.', 400);
    }

    const opinion = opinionsRepository.create({
      description,
      product_id,
      user_id,
      title,
      grade
    });

    await opinionsRepository.save(opinion);

    return opinion
  }
}
