import { DataResponse, ViewModel } from '@app/presentation';
import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from '../dto';

export class Product extends ViewModel {
  @ApiProperty({ description: 'Product ID', default: 1 })
  id: number;

  @ApiProperty({ description: 'Title', example: 'iPhone 9' })
  title: string;

  @ApiProperty({
    description: 'description',
    example: 'An apple mobile which is nothing like apple',
  })
  description: string;

  @ApiProperty({
    description: 'Amount',
    example: 549,
  })
  price: number;

  @ApiProperty({
    description: 'Discount Percentage',
    example: 12.96,
  })
  discountPercentage: number;

  @ApiProperty({
    description: 'Rating',
    example: 4.69,
  })
  rating: number;

  @ApiProperty({
    description: 'Stock product',
    example: 100,
  })
  stock: number;

  @ApiProperty({
    description: 'Brand product',
    example: 'Apple',
  })
  brand: string;

  @ApiProperty({
    description: 'Category product',
    example: 'smartphones',
  })
  category: string;

  @ApiProperty({
    description: 'Image thumbnail',
    example: 'https://picsum.photos/256',
  })
  thumbnail: string;

  @ApiProperty({
    description: 'Image product',
    type: String,
    isArray: true,
    example: [
      'https://picsum.photos/2',
      'https://picsum.photos/222',
      'https://picsum.photos/256',
    ],
  })
  images: string[];

  public static transform(model: ProductResponse): Product {
    return {
      id: model.id,
      title: model.title,
      description: model.description,
      price: model.price,
      discountPercentage: model.discountPercentage,
      rating: model.rating,
      stock: model.stock,
      brand: model.brand,
      category: model.category,
      thumbnail: model.thumbnail,
      images: model.images,
    };
  }
}
export class ProductViewModelResponse extends DataResponse {
  @ApiProperty({ type: () => Product })
  public data: Product;
}
