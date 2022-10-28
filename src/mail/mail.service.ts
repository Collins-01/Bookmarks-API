import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/user/entity';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationMail(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      template: './confirmation',
      subject: 'Welcome to Bookmarks API service!!! Confirm your email.',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
