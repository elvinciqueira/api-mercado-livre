import { Request, Response } from 'express';

import CreateProductService from '../services/CreateProductService';
import ListProductsService from '../services/ListProductsService';
import productView from '../views/products_views';

class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProducts = new ListProductsService();

    const products = await listProducts.execute({ user_id });

    return response.status(200).json(productView.renderMany(products));
  }

  public async create (request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

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
      characteristics,
      user_id
    });

    return response.status(200).json(product);
  }
}

export default ProductsController;
