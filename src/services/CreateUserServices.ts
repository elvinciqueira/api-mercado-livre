import { getRepository } from 'typeorm';

import User from '../models/Users';

interface IRequest {
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, password }: IRequest): Promise<User>{
    const usersRepository = getRepository(User);

    const user = usersRepository.create({ email, password });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
