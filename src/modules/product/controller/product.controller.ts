import { UseSwagger } from '@shared/shared/decorators';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductIdParam, SearchProductParam } from '../dto';
import { ProductService } from '../service/product.service';
import {
  Product,
  ProductViewModelResponse,
  Products,
  ProductsViewModelResponse,
} from '../viewmodels';

@Controller({ path: 'product' })
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseSwagger('Get product by id.')
  @ApiOkResponse({ description: 'OK', type: ProductViewModelResponse })
  @Get(':id')
  async getProduct(
    @Param() param: ProductIdParam,
  ): Promise<ProductViewModelResponse> {
    const product = await this.productService.getProductById(param);
    return Product.item(product);
  }

  @UseSwagger('Get list of products.')
  @ApiOkResponse({ description: 'OK', type: ProductsViewModelResponse })
  @Get()
  async getProducts(@Query() query: SearchProductParam): Promise<any> {
    const product = await this.productService.getProducts(query);
    return Products.item(product);
  }
}
