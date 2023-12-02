import { formatErrorCode } from '@shared/shared/utils';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  Provider,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Request, Response } from 'express';
import { HttpCustomException } from './custom';
import { ErrorCodes, ErrorMessages } from './enums';

@Catch()
class HttpExceptionFilter implements ExceptionFilter {
  catch(err: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const folio = response.getHeaders()['x-correlation-id'].toString();
    const infoUrl = process.env.INFO_URL || '';
    const code = formatErrorCode(
      `${request.path.split(/\/v\d*\/.*/)[0].substr(1)}`,
    );

    if (err instanceof HttpCustomException) {
      const status = err.getStatus();

      const error = JSON.stringify({
        message: err.message,
        errorCode: err.errorCode,
        externalErrorCode: err.externalErrorCode,
        stack: err.stack,
        errorParent: {
          message: err.errorParent?.message,
          stack: err.errorParent?.stack,
        },
      });
      Logger.error(error);

      response.status(status).json({
        code: `${status}.${code}.${status}${err.errorCode}`,
        message: ErrorMessages[status],
        folio,
        info: `${infoUrl}${code}.${status}${err.errorCode}`,
        details: err.details,
      });
    } else if (err instanceof HttpException) {
      const error = JSON.stringify({
        message: err.message,
        stack: err.stack,
      });
      Logger.error(error);
      const status = err.getStatus();

      let errorCode: string;
      let message: string;
      let details: string | string[];
      switch (status) {
        case 404:
          errorCode = ErrorCodes.NOT_FOUND;
          message = 'Recurso no encontrado';
          details = [message];
          break;
        default:
          errorCode = ErrorCodes.HTTP_GENERIC_ERROR;
          message = (err as any).response?.message || err.message;
          details = message;
          if (!Array.isArray(message)) details = [message];
      }

      response.status(status).json({
        code: `${status}.${code}.${status}${errorCode}`,
        message: ErrorMessages[status] || message,
        folio,
        info: '',
        details,
      });
    } else {
      const error = JSON.stringify({
        message: err.message,
        stack: err.stack,
      });
      Logger.error(error);

      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      response.status(status).json({
        code: `${status}.${code}.${status}${ErrorCodes.HTTP_GENERIC_ERROR}`,
        message: ErrorMessages[status],
        folio,
        info: '',
        details: [ErrorMessages[status]],
      });
    }
  }
}

export const HttpExceptionFilterProvider: Provider = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};
