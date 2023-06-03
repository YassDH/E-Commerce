import { Module } from '@nestjs/common';
import { MailsubscribeController } from './mailsubscribe.controller';
import { MailsubscribeService } from './mailsubscribe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterEntity } from './entities/newsletter.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import * as dotenv from "dotenv"
dotenv.config()

@Module({
  imports : [TypeOrmModule.forFeature([NewsletterEntity]),
  MailerModule.forRoot({
    transport: {
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEWS_MAIL,
        pass: process.env.NEWS_PASSWORD,
      },
    },
    defaults: {
      from: `"No Reply" <${process.env.NEWS_MAIL}>`,
    },
    template: {
      dir: join(__dirname, 'templates'), 
      adapter: new HandlebarsAdapter(), 
      options: {
      strict: true,
      },
    },
    }),
  ],
  controllers: [MailsubscribeController],
  providers: [MailsubscribeService]
})
export class MailsubscribeModule {}
