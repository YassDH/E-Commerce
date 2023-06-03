import { IsNotEmpty } from "class-validator";

export class OrderAddDTO{
    @IsNotEmpty()
    cart : any[]
    @IsNotEmpty()
    shipping_fee : number
    @IsNotEmpty()
    total_amount : number
    @IsNotEmpty()
    userId : number
}