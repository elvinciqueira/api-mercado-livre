import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Product from '../models/Products';
import Question from '../models/Question';
import User from '../models/Users';

interface IRequest {
  title: string;
  product_id: number;
  user_id: number;
}

export default class CreateQuestionService {
  public async execute({ product_id, title, user_id }: IRequest): Promise<Question> {
    const productsRepository = getRepository(Product);
    const usersRepository = getRepository(User);
    const questionRepository = getRepository(Question);

    const product = await productsRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Product not found.', 400);
    }

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users.', 400);
    }

    if (+user.id === +product.user_id) {
      throw new AppError('You cant ask questions about your own product', 403);
    }

    const question = questionRepository.create({
      title,
      product_id,
      user_id
    });

    await questionRepository.save(question);

    return question;
  }
}
