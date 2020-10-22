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

@Entity('purchase')
class Purchase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  gateway: string;

  @Column()
  quantity: number;

  @Column()
  product_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id'})
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Purchase;
