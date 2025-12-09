import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from "./user.entity";

@Entity({ name: 'addresses' })
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, user => user.addresses, { onDelete: 'CASCADE' })
    user?: User;

    @Column()
    addressLine?: string;

    @Column()
    city!: string;

    @Column({ nullable: true })
    state?: string;

    @Column()
    country?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
