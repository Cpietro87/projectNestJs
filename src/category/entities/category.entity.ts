import { Product } from "src/product/entities/product.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    categoryName: string

    
    @OneToMany(() => Product, product => product.category)
    product: Product[]
}
