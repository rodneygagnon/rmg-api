import 'dotenv/config'

import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';

const port = process.env.USERS_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  console.log(`USERS PORT: ${port}`);

  await app.listen(port);
}

bootstrap();
