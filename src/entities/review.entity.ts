import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity({ name: "reviews" })
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: "CASCADE",
  })
  product?: Product;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: "CASCADE" })
  user?: User;

  @Column({ type: "int" })
  rating!: number;

  @Column({ nullable: true })
  comment?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
