import { HttpCustomException } from '@app/presentation';
import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from '../enums';

export class GetProductException extends HttpCustomException {
  constructor(
    message = 'An error occurred while obtaining the products.',
    err?: Error,
    details?: string[],
  ) {
    super(
      message,
      ErrorCodes.GET_PRODUCT_ERROR,
      HttpStatus.BAD_REQUEST,
      err,
      null,
      details || [message],
    );
  }
}
