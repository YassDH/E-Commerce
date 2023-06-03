import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import * as dotenv from 'dotenv'
dotenv.config()


@Injectable()
export class PaymentService {
    private stripe;
    constructor(){
        this.stripe =  new Stripe(process.env.API_SECRET_KEY, {
          apiVersion: '2022-11-15'
        })
    }
    async createPayment(paymentRequestBody){
        let sumAmount = paymentRequestBody.shipping_fee + paymentRequestBody.total_amount;
        return this.stripe.paymentIntents.create({
            amount: sumAmount,
            currency: "usd",
        });
    }
}
