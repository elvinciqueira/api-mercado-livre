import { getRepository } from "typeorm";

import Products from "../models/Products";

interface IRequest {
  user_id: string;
}

class ListProductsService {
  public async execute({ user_id }: IRequest): Promise<Products[]> {
    const productsRepository = getRepository(Products);

    const products = await productsRepository.find({
      where: { user_id },
      relations: ['category', 'images', 'opinion']
    });

    return products;
  }
}

export default ListProductsService;
