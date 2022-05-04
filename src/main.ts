import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['fdsffsdfjklfsdn'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // validation pipe za DTO prilikom post/put/patch etc request-a
      // security prilikom kreiranja usera npr, nebitno koliko drugih property-ja posaljemo, u bazi ce biti upisan samo email i password, ujedno su i obavezni !!
    }),
  );
  await app.listen(3000);
}
bootstrap();
