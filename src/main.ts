import { BadRequestCustomException } from '@app/presentation';
import { mapForMissingVar } from '@shared/shared';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as hpropagate from 'hpropagate';
import { resolve } from 'path';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { swaggerConfig } from './config/swagger.config';

const port = configuration().api.port;
const basePath = configuration().api.basePath;
const serviceUrl = configuration().api.url;

async function bootstrap() {
  const path = resolve('./.env.example');
  await mapForMissingVar(path, Logger);

  hpropagate({ propagateInResponses: true });

  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const details = errorDetails(errors);
        return new BadRequestCustomException(null, details);
      },
    }),
  );

  const errorDetails = (errors: any) => {
    return errors.flatMap((err: any) => {
      if (err.constraints) return Object.values(err.constraints);
      return errorDetails(err.children);
    });
  };

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig(serviceUrl, basePath),
  );

  SwaggerModule.setup(`${basePath}/swagger`, app, document);

  app.setGlobalPrefix(basePath);
  await app.listen(port);

  Logger.log(`Api product service running in port ${port}`);
}

bootstrap();
