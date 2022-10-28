import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Bookmarks API Documentation')
    .setDescription('API Description')
    .setVersion('1.0')
    .build();
  const document = await SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(8000);
}
bootstrap();

/*
   Run application :npm run start:dev
  Configure DB : docker compose up dev-db -d
  prisma:dev:deploy
   Start Prisma Studio:  npx prisma studio

*/
// https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0

// https://www.notion.so/1-Set-up-Prisma-and-integrate-into-NestJS-c5ee2b94556b4bddbe6d1772e9117f72
