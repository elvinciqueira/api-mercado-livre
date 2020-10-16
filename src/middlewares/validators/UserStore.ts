import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

import AppError from '../../errors/AppError';

export default async (request: Request, response: Response, next: NextFunction) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    await schema.validate(request.body, {
      abortEarly: false
    });

    return next();
  } catch (error) {
    throw new AppError(error.inner, 400);
  }
}

