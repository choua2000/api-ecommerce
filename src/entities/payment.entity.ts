import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,CreateDateColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity({ name: 'payments' })
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Order, order => order.payments, { onDelete: 'CASCADE' })
    order?: Order;

    @Column()
    paymentMethod!: string; // credit_card, paypal, bank_transfer

    @Column("decimal", { precision: 10, scale: 2 })
    amount!: number;

    @Column({ default: 'pending' })
    status!: string; // pending, paid, failed

    @Column({ nullable: true, type: 'timestamp' })
    paidAt!: Date;
}
