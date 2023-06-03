import { Entity , PrimaryGeneratedColumn , Column, ManyToOne, OneToMany} from 'typeorm'
import { Timestamp } from 'src/brand/Generics/timestamp.entity'
import { OrderStateEnum } from 'src/enums/order-state.enum'
import { UserEntity } from 'src/user/entities/user.entity'
import { OrderToProductEntity } from './order-to-product.entity'

@Entity('order')
export class OrderEntity extends Timestamp{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    price:number

    @Column({
        type : 'enum',
        enum : OrderStateEnum,
        default : OrderStateEnum.PENDING
    })
    status : String
    
    @ManyToOne(
        type => UserEntity,
        (user) => user.orders,
        {
            eager : true,
            nullable : false
        }
    )
    user: UserEntity

    @OneToMany(
        type => OrderToProductEntity,
        (OrderToProduct) => OrderToProduct.order,
        {
            eager : true,
            nullable : true
        })
    ordertoproduct : OrderToProductEntity[]
}