import { Injectable , BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Equal, Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { OrderToProductEntity } from './entities/order-to-product.entity';
import { OrderAddDTO } from './dto/order-add';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository : Repository<OrderEntity>,
        @InjectRepository(UserEntity)
        private userRepository : Repository<UserEntity>,
        @InjectRepository(ProductEntity)
        private productRepository : Repository<ProductEntity>,
        @InjectRepository(OrderToProductEntity)
        private orderToProductRepository : Repository<OrderToProductEntity>
    ){}

    async addOrder(orderData : OrderAddDTO){
        if(orderData.cart.length < 1){
            throw new BadRequestException("Cart must not be empty !")
        }
        const user = await this.userRepository.findOne({where : { id : Equal(orderData.userId)}})
        if(!user){
            throw new BadRequestException("User Not Found !")
        }
        var order = this.orderRepository.create()
        order.price = orderData.shipping_fee + orderData.total_amount
        order.user = user

        order = await this.orderRepository.save(order);

        orderData.cart.forEach(async (e)=>{
            const product = await this.productRepository.findOne({where : { id : Equal(e.id)}});
            if(!product || product?.quantity < e.amount){
                throw new BadRequestException("Quantities Not Available !")
            }
            product.quantity = product.quantity-e.amount
            await this.productRepository.save(product)

            const orderToProduct = this.orderToProductRepository.create()
            orderToProduct.product = product
            orderToProduct.order = order
            orderToProduct.quantity = e.amount
 
            try{
                await this.orderToProductRepository.save(orderToProduct);
            }catch{
                throw new BadRequestException("An Error Has Occured Please try again !")
            }
        })
        return order;
    }

    async getOrdersWithUser(){ 
        return await this.orderRepository.find()
    }
    async showAllOrderDetails( id : number){ 
        const order = await this.orderRepository.findOne({where : {id : Equal(id)}})
        if(!order){
            throw new NotFoundException("Order Not Found !")
        }
        const productsInOrder : ProductEntity[] = []
        order.ordertoproduct.forEach(async (e)=>{
            e.product.quantity = e.quantity
            productsInOrder.push(e.product)
        })
        var OrderInfos = {
            id : order.id,
            date : order.createdAt,
            price  : order.price/100,
            status : order.status,
            user : order.user.firstname+" "+order.user.lastname,
            email : order.user.email,
            adress : order.user.adress,
            postCode : order.user.postcode,
            products : productsInOrder
            
        }
        return OrderInfos;
    }

    async editOrder(id : number, status : String){
        const editedOrder = await this.orderRepository.preload({ 
            id,
            ...status
        })
        if(!editedOrder) {
            throw new NotFoundException("Order Not Found !")
        }
        return await this.orderRepository.save(editedOrder)
    }
}
