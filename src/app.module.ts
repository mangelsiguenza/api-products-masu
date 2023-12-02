import {
  HttpExceptionFilterProvider,
  ResponseInterceptorProvider,
} from '@app/presentation';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    ProductModule,
  ],
  providers: [HttpExceptionFilterProvider, ResponseInterceptorProvider],
})
export class AppModule {}
