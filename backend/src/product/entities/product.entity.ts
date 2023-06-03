import { Entity , PrimaryGeneratedColumn , Column, ManyToOne, OneToMany} from 'typeorm'
import { Timestamp } from '../Generics/timestamp.entity'
import { CategoryEntity } from 'src/category/entities/category.entity'
import { BrandEntity } from 'src/brand/entities/brand.entity'
import { OrderToProductEntity } from 'src/order/entities/order-to-product.entity'

@Entity('product')
export class ProductEntity extends Timestamp{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:String
    
    @Column()
    price:number
    
    @Column()
    quantity:number
    
    @Column()
    description:String
    
    @Column()
    image:String
    
    @ManyToOne(
        type => CategoryEntity,
        (category) => category.products,
        {
            cascade : true,
            nullable : false,
            onDelete : "CASCADE",
            onUpdate : "CASCADE"
        }
    )
    category: CategoryEntity
    
    @ManyToOne(
        type => BrandEntity,
        (brand) => brand.product,
        {
            cascade : true, 
            nullable : false,
            onDelete : "CASCADE",
            onUpdate : "CASCADE"
        }
    )
    brand:BrandEntity 
    
    @OneToMany(
        type => OrderToProductEntity,
        (OrderToProduct) => OrderToProduct.product,
        {
            nullable : true
        })
    ordertoproduct : OrderToProductEntity[]
}