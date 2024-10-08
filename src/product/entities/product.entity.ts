import { Category } from "src/category/entities/category.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products'})
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    code: string

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createAt: Date

    @Column()
    categoryId: number

    @ManyToMany(() => Category, category => category.product)
    category: Category
}
