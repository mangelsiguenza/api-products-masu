import { DataResponse, ViewModel } from '@app/presentation';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProductsResponse } from '../dto';
import { Product } from './product.viewmodel';

export class Products extends ViewModel {
  @ApiProperty({ type: Product, isArray: true })
  products: Product[];

  @ApiProperty({ description: 'Number page', default: 1 })
  @IsString()
  page: number;

  @ApiProperty({ description: 'Number of items per page.', default: 10 })
  @IsString()
  perPage: number;

  @ApiProperty({ description: 'Total items', default: 100 })
  @IsString()
  count: number;

  public static transform(model: ProductsResponse): Products {
    return {
      products: Product.collection(model.products),
      page: model.page,
      perPage: model.perPage,
      count: model.count,
    };
  }
}

export class ProductsViewModelResponse extends DataResponse {
  @ApiProperty({ type: () => Products })
  public data: Products;
}
