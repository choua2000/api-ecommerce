import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => Product, product => product.category)
    products?: Product[];
}
