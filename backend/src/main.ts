import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  // Mask database password for security when printing to terminal
  const dbUrl = process.env.DATABASE_URL;
  let dbDisplay = 'Not configured';
  if (dbUrl) {
    try {
      const url = new URL(dbUrl);
      dbDisplay = `${url.protocol}//${url.username}:****@${url.host}${url.pathname}`;
    } catch {
      dbDisplay = dbUrl.replace(/:([^:@]+)@/, ':****@');
    }
  }

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`🗄️  Database connection:     ${dbDisplay}`);
}
void bootstrap();

