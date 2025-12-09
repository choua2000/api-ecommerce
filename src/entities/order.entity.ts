import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { OrderItem } from "./orderItem.entity";
// import { Payment } from "./payment.entity";

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, user => user.orders, { onDelete: 'CASCADE' })
    user?: User;

    @Column("decimal", { precision: 10, scale: 2 })
    totalAmount!: number;

    @Column({ default: 'pending' })
    status!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems?: OrderItem[];

    // @OneToMany(() => Payment, payment => payment.order)
    // payments?: Payment[];
}
