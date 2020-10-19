import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionController {
  public async create (request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user } = await authenticateUser.execute({ email, password })

    return response.status(200).json({ user });
  }
}

export default SessionController;
