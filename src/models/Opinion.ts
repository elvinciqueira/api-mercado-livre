import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import Product from './Products';
import User from './Users';

@Entity('opinions')
class Opinion {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  grade: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  product_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, product => product.opinion)
  @JoinColumn({ name: 'product_id'})
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Opinion;
