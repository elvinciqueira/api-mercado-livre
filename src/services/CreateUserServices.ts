import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/Users';
import AppError from '../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

// 3 pontos de carga intrísica
class CreateUserService {
  public async execute({ email, password }: IRequest): Promise<User>{
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({ where: { email }});

    if (checkUserExists) {
      throw new AppError('Email already registered', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
