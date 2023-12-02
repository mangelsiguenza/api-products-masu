import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';

@Module({
  imports: [HttpModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
