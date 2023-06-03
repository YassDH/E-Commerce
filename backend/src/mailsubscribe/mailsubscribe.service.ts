import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { NewsletterEntity } from './entities/newsletter.entity';
import { MailSubscribeDto } from './dto/mail-subscribe-dto';
import { MailSendDto } from './dto/mail-send-dto';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailsubscribeService {
    constructor(
        @InjectRepository(NewsletterEntity)
        private mailSubscribeRepository : Repository<NewsletterEntity>,
        private mailerService: MailerService
    ){}

    async subscribeToNewsletter(email : MailSubscribeDto){
        const mail = await this.mailSubscribeRepository.findOne({where : {mail : Equal(email.emailSubscribe)}})
        if(mail){
            throw new BadRequestException("Email already subscribed ! Please try with an other one !")
        }
        const emailToAdd = this.mailSubscribeRepository.create()
        emailToAdd.mail = email.emailSubscribe
        return await this.mailSubscribeRepository.save(emailToAdd)
    }

    async sendEmails(email : MailSendDto){
        const mails = await this.mailSubscribeRepository.find()
        if(!mails || mails.length == 0){
            throw new NotFoundException("You have no subsribers !")
        }

        mails.forEach(async (e)=>{
            try{
                await this.mailerService.sendMail({
                    to: e.mail.toString(),
                    subject: email.object.toString(),
                    template: './notification',
                    context: email
                    })
            }catch(e){
                throw new BadRequestException("An Error has occured while sending Emails ! Please try again !")
            }
        })
    }
}
