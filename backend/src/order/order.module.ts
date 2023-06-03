import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderToProductEntity } from './entities/order-to-product.entity';
import { OrderEntity } from './entities/order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ProductModule } from 'src/product/product.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports : [TypeOrmModule.forFeature(
    [OrderToProductEntity, OrderEntity, ProductEntity, UserEntity ]
  ),ProductModule, UserModule],
  controllers: [OrderController], 
  providers: [OrderService]
})
export class OrderModule {}
