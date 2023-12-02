import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Provider,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let folio: string;

    return next.handle().pipe(
      map((data) => {
        const res: Response = context.switchToHttp().getResponse();
        folio = res.getHeader('x-correlation-id').toString();

        const shared = {
          mensaje: 'Successful operation.',
          folio,
        };

        return data ? Object.assign(shared, { data }) : shared;
      }),
    );
  }
}

export const ResponseInterceptorProvider: Provider = {
  provide: APP_INTERCEPTOR,
  useClass: ResponseInterceptor,
};
