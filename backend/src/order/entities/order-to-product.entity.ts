import { Entity , PrimaryGeneratedColumn , Column, ManyToOne, ManyToMany} from 'typeorm'
import { ProductEntity } from 'src/product/entities/product.entity'
import { Timestamp } from 'src/brand/Generics/timestamp.entity'
import { OrderEntity } from './order.entity'

@Entity('ordertoproductentity')
export class OrderToProductEntity extends Timestamp{
    @PrimaryGeneratedColumn()
    orderToProductEntityID :number
    @Column()
    quantity :number
    @ManyToOne(
        type => OrderEntity,
        (order) => order.ordertoproduct,
        {
            nullable : false
        }
    )
    order: OrderEntity
    @ManyToOne(
        type => ProductEntity,
        (product) => product.ordertoproduct,
        {
            cascade : true,
            onDelete : "CASCADE",
            onUpdate : "CASCADE",
            eager : true,
            nullable : false
        }
    )
    product: ProductEntity    
}