import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserModule } from 'src/user/user.module';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports : [TypeOrmModule.forFeature([OrderEntity, UserEntity, ProductEntity]),
UserModule, OrderModule, ProductModule],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
