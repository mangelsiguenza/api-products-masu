import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (serviceUrl: string, prefix: string) =>
  new DocumentBuilder()
    .setTitle('API de Product - MASU.')
    .setDescription('API de Products - MASU.')
    .addServer(`${serviceUrl}${prefix}`)
    .setVersion('1.0')
    .build();
