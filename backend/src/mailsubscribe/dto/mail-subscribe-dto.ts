import { IsEmail, IsNotEmpty } from "class-validator";
export class MailSubscribeDto {
    @IsNotEmpty() 
    @IsEmail()
    emailSubscribe : String
}