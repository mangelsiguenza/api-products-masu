import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from '../enums';
import { HttpCustomException } from './http-custom.exception';

export class UnauthorizedCustomException extends HttpCustomException {
  constructor(message = 'Sin autorización.', err?: Error, details?: string[]) {
    super(
      message,
      ErrorCodes.UNAUTHORIZED,
      HttpStatus.UNAUTHORIZED,
      err,
      null,
      details || [message],
    );
  }
}
