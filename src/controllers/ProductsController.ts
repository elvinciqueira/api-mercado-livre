import { Request, Response } from 'express';

import CreateProductService from '../services/CreateProductService';
import ListProductsService from '../services/ListProductsService';

class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductsService();

    const products = await listProducts.execute();

    return response.status(200).json(products);
  }

  public async create (request: Request, response: Response): Promise<Response> {
    const {
      name,
      quantity,
      price,
      category_id,
      characteristics
    } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      quantity,
      price,
      category_id,
      characteristics
    });

    return response.status(200).json(product);
  }
}

export default ProductsController;
