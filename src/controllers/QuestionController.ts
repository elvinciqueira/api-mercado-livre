import { Request, Response } from 'express';
import CreateQuestionService from '../services/CreateQuestionService';

export default class QuestionController {
  public async create (request: Request, response: Response): Promise<Response> {
    const user_id = +request.user.id;
    const { id } = request.params;
    const { title } = request.body;

    const createQuestion = new CreateQuestionService();

    const question = await createQuestion.execute({
      product_id: +id,
      user_id,
      title,
    });

    return response.status(200).json(question);
  }
}
