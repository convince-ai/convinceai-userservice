import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ?? 8080;
  const app = await NestFactory.create(AppModule);

  // Habilitar validação de DTOs
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
