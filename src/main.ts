import { NestFactory } from '@nestjs/core';
import { AppModule } from './domains/app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT ?? 3000;

  console.log(`App start on port ${port}`);

  await app.listen(port);
}

void bootstrap();
