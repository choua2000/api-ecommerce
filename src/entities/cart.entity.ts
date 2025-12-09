import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity({ name: 'carts' })
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, user => user.cartItems, { onDelete: 'CASCADE' })
    user?: User;

    @ManyToOne(() => Product, product => product.cartItems, { onDelete: 'CASCADE' })
    product?: Product;

    @Column({ default: 1 })
    quantity!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}
