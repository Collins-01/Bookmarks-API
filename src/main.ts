import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // skipMissingProperties: true,
    }),
  );
  await app.listen(8000);
}
bootstrap();

/*
   Run application :npm run start:dev
  Configure DB : docker compose up dev-db -d
   Start Prisma Studio:  npx prisma studio

*/
// https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0