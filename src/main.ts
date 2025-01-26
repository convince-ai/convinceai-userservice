import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ?? 8080;
  const app = await NestFactory.create(AppModule);

  // Habilitar validação de DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Configuração de CORS
  app.enableCors({
    origin: ['http://localhost:3001', 'https://convinceai.netlify.app','http://convinceai.surge.sh'], // Domínios permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Se necessário enviar cookies ou credenciais
  });

  await app.listen(port);
}
bootstrap();
