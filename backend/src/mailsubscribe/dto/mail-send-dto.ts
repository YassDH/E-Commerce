import { IsNotEmpty, IsString } from "class-validator";
export class MailSendDto {
    @IsNotEmpty()
    @IsString()
    object : String
    @IsNotEmpty()
    @IsString()
    message : String
}