import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/Users';
import AppError from '../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<{ user: User }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email }});

    if (!user) {
      throw new AppError('Incorrect email/passord combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/passord combination');
    }

    return {
      user
    }
  }
}

export default AuthenticateUserService;
