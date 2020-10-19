import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/Users';
import AppError from '../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User,
  token: string;
}

// 3 pontos de carga intrísica
class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email }});

    if (!user) {
      throw new AppError('Incorrect email/passord combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/passord combination');
    }

    const token = sign({}, '487a76824d56a9df2c8a18f6a05329d5', {
      subject: String(user.id),
      expiresIn: '1d'
    });

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService;
