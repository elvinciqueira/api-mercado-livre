import { Request, Response } from 'express';
import CreatePurchaseService from '../services/CreatePurchaseService';

export default class PurchaseController {
  public async create (request: Request, response: Response): Promise<Response> {
    const user_id = +request.user.id;
    const { id } = request.params;
    const { gateway, quantity } = request.body;

    const createPurchase = new CreatePurchaseService();

    const purchase = await createPurchase.execute({
      user_id,
      gateway,
      quantity,
      product_id: +id,
    });

    return response.status(302).json({ url: purchase });
  }
}
