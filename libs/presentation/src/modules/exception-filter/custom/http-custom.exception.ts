import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpCustomException extends HttpException {
  readonly errorCode: string;
  readonly errorParent?: Error;
  readonly externalErrorCode?: string;
  readonly details?: string[];

  constructor(
    message: string,
    errorCode: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    errorParent?: Error,
    externalErrorCode?: string,
    details?: string[],
  ) {
    super(
      { message, errorCode, statusCode, externalErrorCode, details },
      statusCode,
    );
    this.errorCode = errorCode;
    this.errorParent = errorParent;
    this.externalErrorCode = externalErrorCode;
    this.details = details || [];
  }
}
