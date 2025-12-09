import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";
import { Address } from "./address.entity";
import { Review } from "./review.entity";
import { Cart } from "./cart.entity";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ default: 'customer' })
    role!: string;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Order, order => order.user)
    orders?: Order[];

    @OneToMany(() => Address, address => address.user)
    addresses?: Address[];

    @OneToMany(() => Review, review => review.user)
    reviews?: Review[];

    @OneToMany(() => Cart, cart => cart.user)
    cartItems?: Cart[];
}
