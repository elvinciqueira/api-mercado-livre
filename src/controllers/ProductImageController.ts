import { Request, Response } from 'express';

import UpdateImageProductService from "../services/UpdateImageProductService";

export default class ProductImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.body;
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return {
        path: image.filename
      }
    });

    const updateImage = new UpdateImageProductService();

    const product = await updateImage.execute({
      product_id,
      user_id: request.user.id,
      images
    });

    return response.json(product);
  }
}
