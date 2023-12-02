import { Module } from '@nestjs/common';
import { ResponseInterceptorProvider } from './response.interceptor';

@Module({
  providers: [ResponseInterceptorProvider],
  exports: [ResponseInterceptorProvider],
})
export class ResponseModule {}
