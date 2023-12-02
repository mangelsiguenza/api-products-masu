import { Module } from '@nestjs/common';
import { HttpExceptionFilterProvider } from './http-exception.filter';

@Module({
  providers: [HttpExceptionFilterProvider],
  exports: [HttpExceptionFilterProvider],
})
export class ExceptionFilterModule {}
