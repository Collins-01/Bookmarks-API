import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { JWTStrategy } from './strategy';

@Module({
  controllers: [AuthController],
  imports: [PrismaModule,JwtModule.register({}),MailModule],
  providers: [AuthService, JWTStrategy],
})
export default class AuthModule {}
