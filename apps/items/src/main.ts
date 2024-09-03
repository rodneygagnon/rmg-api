import 'dotenv/config'

import { NestFactory } from '@nestjs/core';
import { ItemsModule } from './items.module';

const port = process.env.ITEMS_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(ItemsModule);

  console.log(`ITEMS PORT: ${port}`);

  await app.listen(port);
}

bootstrap();
