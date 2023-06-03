import { IsOptional } from "class-validator";
export class ProductQueryDTO {
    @IsOptional()  
    name : String
    @IsOptional()  
    category : number
    @IsOptional()  
    company : number
    @IsOptional()
    availableOnly : number
    @IsOptional()  
    nameOrder : number
    @IsOptional() 
    priceOrder : number
    @IsOptional() 
    price : number
} 