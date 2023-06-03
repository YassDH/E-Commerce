import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/user/auth.guard';
import { OrderAddDTO } from './dto/order-add';
import { AdminGuard } from 'src/user/admin.guard';

@Controller('order')
export class OrderController {
    constructor(private orderService : OrderService){}

    @UseGuards(AuthGuard)
    @Post('/add')
    async addOrder(@Body() orderData : OrderAddDTO){
        return await this.orderService.addOrder(orderData);
    }
    @UseGuards(AdminGuard)
    @Get('')
    async getOrdersWithUser(){
        return await this.orderService.getOrdersWithUser();
    }
    @UseGuards(AdminGuard)
    @Patch(':id')
    async editOrder(@Param('id', ParseIntPipe) id : number, @Body() status : String){
        return await this.orderService.editOrder(id,status);
    }
    @UseGuards(AdminGuard)
    @Get(':id')
    async showAllOrderDetails(@Param('id', ParseIntPipe) id : number){
        return await this.orderService.showAllOrderDetails(id);
    }
}
