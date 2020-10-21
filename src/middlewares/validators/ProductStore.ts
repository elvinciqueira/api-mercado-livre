import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

import AppError from '../../errors/AppError';

// 3 pontos de carga intrísica
export default async (request: Request, response: Response, next: NextFunction) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.string().min(1).required(),
      category_id: Yup.number().required(),
      quantity: Yup.number().required().min(1),
      description: Yup.string().min(1000).required(),
    });

    await schema.validate(request.body, {
      abortEarly: false
    });

    return next();
  } catch (error) {
    throw new AppError(error.inner, 400);
  }
}

