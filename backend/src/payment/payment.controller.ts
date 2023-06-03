import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/user/auth.guard';
import { PaymentRequestDTO } from './dto/payment-request-body';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService : PaymentService){}

    @UseGuards(AuthGuard)
    @Post('')
    async createPayment(@Body() paymentRequestBody){
        return await this.paymentService.createPayment(paymentRequestBody);
    }
}
