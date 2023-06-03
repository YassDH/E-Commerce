import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MailsubscribeService } from './mailsubscribe.service';
import { MailSubscribeDto } from './dto/mail-subscribe-dto';
import { AdminGuard } from 'src/user/admin.guard';
import { MailSendDto } from './dto/mail-send-dto';

@Controller('mailsubscribe')
export class MailsubscribeController {
    constructor ( private mailSubscribeService : MailsubscribeService) {}

    @Post()
    async subscribeToNewsletter(@Body() email : MailSubscribeDto){
        return await this.mailSubscribeService.subscribeToNewsletter(email)
    }

    @UseGuards(AdminGuard)
    @Post('send')
    async sendEmails(@Body() email : MailSendDto){
        return await this.mailSubscribeService.sendEmails(email)
    }
}
