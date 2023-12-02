import {
  BadRequestModel,
  InternalServerErrorModel,
  NotFoundModel,
} from '@app/presentation';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiProduces,
} from '@nestjs/swagger';

const mimeType = 'application/json';

export const UseSwagger = (
  description: string,
  mimeTypeConsumes = mimeType,
  mimeTypeProduces = mimeType,
) => {
  return applyDecorators(
    ApiOperation({ description, summary: description }),
    ApiConsumes(mimeTypeConsumes),
    ApiProduces(mimeTypeProduces),
    ApiBadRequestResponse({
      description: 'Petición incorrecta.',
      type: BadRequestModel,
    }),
    ApiNotFoundResponse({
      description: 'Recurso no encontrado.',
      type: NotFoundModel,
    }),
    ApiInternalServerErrorResponse({
      description: 'Error inesperado.',
      type: InternalServerErrorModel,
    }),
  );
};
