import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

import Category from './Category';
import Image from './Image';
import User from "./Users";

interface CharacteristicDataType {
  name: string,
  description: string;
}

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column('simple-json')
  characteristics: CharacteristicDataType[];

  @Column()
  category_id: number;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id'})
  category: Category;

  @OneToMany(() => Image, image => image.product, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_id'})
  images: Image[];

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
