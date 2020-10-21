import { Request, Response } from 'express';

import CreateOpinionService from '../services/CreateOpinionService';

export default class OpinionController {
  public async create (request: Request, response: Response): Promise<Response> {
    const user_id = +request.user.id;
    const { id } = request.params;
    const { grade, title, description } = request.body;

    const createOpinion = new CreateOpinionService();

    const opinion = await createOpinion.execute({
      grade,
      title,
      description,
      user_id,
      product_id: +id,
    });

    return response.status(200).json(opinion);
  }
}
