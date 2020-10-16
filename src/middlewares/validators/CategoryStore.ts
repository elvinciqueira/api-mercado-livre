import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

import AppError from '../../errors/AppError';

// 3 pontos de carga intrísica
export default async (request: Request, response: Response, next: NextFunction) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    await schema.validate(request.body, {
      abortEarly: false
    });

    return next();
  } catch (error) {
    throw new AppError(error.inner, 400);
  }
}

