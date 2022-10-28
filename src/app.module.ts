import { Global, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import AuthModule from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    MailModule,
  ],
})
export class AppModule {}
