import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category.entity";
import { OrderItem } from "./orderItem.entity";
import { Review } from "./review.entity";
import { Cart } from "./cart.entity";

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price!: number;

    @Column({ default: 0 })
    stock!: number;

    @ManyToOne(() => Category, category => category.products, { onDelete: 'SET NULL' })
    category?: Category;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => OrderItem, orderItem => orderItem.product)
    orderItems?: OrderItem[];

    @OneToMany(() => Review, review => review.product)
    reviews?: Review[];

    @OneToMany(() => Cart, cart => cart.product)
    cartItems?: Cart[];
}
