import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

import Product from "./Products";

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  parent_id: number;

  @ManyToOne(() => Category, category => category.children)
  @JoinColumn({ name: 'parent_id'})
  parent: Category;

  @OneToMany(() => Category, category => category.parent)
  @JoinColumn({ name: 'parent_id'})
  children: Category[];

  @OneToMany(() => Category, category => category.products)
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Category;
