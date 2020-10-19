import { getRepository } from "typeorm";

import Products from "../models/Products";

class ListProductsService {
  public async execute(): Promise<Products[]> {
    const productsRepository = getRepository(Products);

    const products = await productsRepository.find({
      relations: ['category']
    });

    return products;
  }
}

export default ListProductsService;
