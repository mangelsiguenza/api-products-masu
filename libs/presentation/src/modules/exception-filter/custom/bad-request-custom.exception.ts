import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from '../enums';
import { HttpCustomException } from './http-custom.exception';

export class BadRequestCustomException extends HttpCustomException {
  constructor(message = 'Parámetros incorrectos.', details?: string[]) {
    super(
      message,
      ErrorCodes.DATA_VALIDATION_ERROR,
      HttpStatus.BAD_REQUEST,
      null,
      null,
      details || [message],
    );
  }
}
