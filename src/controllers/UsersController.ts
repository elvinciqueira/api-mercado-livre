import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserServices';

// 2 ponto de carga intrísica
export default class UserController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ email, password });

    return response.status(200).json(user);
  }
}
