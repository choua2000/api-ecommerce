import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity({ name: 'order_items' })
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Order, order => order.orderItems, { onDelete: 'CASCADE' })
    order!: Order;

    @ManyToOne(() => Product, product => product.orderItems, { onDelete: 'CASCADE' })
    product?: Product;

    @Column()
    quantity!: number;

    @Column("decimal", { precision: 10, scale: 2 })
    price!: number;
}
