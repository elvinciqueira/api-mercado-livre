import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn()
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Category;
