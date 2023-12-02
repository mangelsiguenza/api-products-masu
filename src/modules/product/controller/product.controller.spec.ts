import { HttpModule } from '@nestjs/axios';
import { Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../../../config/configuration';
import { ProductResponse, ProductsResponse } from '../dto';
import { ProductService } from '../service/product.service';
import { ProductController } from './product.controller';

describe('AppController', () => {
  let productController: ProductController;
  let spyProductService: ProductService;

  beforeEach(async () => {
    const ProductServiceProvider: Provider = {
      provide: ProductService,
      useClass: ProductServiceProviderMock,
    };

    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] }), HttpModule],
      controllers: [ProductController],
      providers: [ProductServiceProvider],
    }).compile();

    productController = app.get<ProductController>(ProductController);
    spyProductService = app.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('Product ', () => {
    it('should return a product by id', async () => {
      const result = await productController.getProduct({ id: 1 });

      expect(spyProductService.getProductById).toHaveBeenCalled();
      expect(result).toEqual(mockProductResponse);
    });
  });

  describe('Products ', () => {
    it('should return a list products by search params', async () => {
      const result = await productController.getProducts({
        search: 'phone',
        select: ['title', 'price', 'stock'],
        page: 1,
        perPage: 10,
      });

      expect(spyProductService.getProducts).toHaveBeenCalled();
      expect(result).toEqual(mockProductsResponse);
    });
  });
});
class ProductServiceProviderMock {
  getProductById = jest.fn().mockReturnValue(mockProductResponse);
  getProducts = jest.fn().mockReturnValue(mockProductsResponse);
}

const mockProductResponse: ProductResponse = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 100,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: 'https://picsum.photos/256',
  images: [
    'https://picsum.photos/2',
    'https://picsum.photos/222',
    'https://picsum.photos/256',
  ],
};

const mockProductsResponse: ProductsResponse = {
  products: [
    {
      title: mockProductResponse.title,
      price: mockProductResponse.price,
      stock: mockProductResponse.stock,
    },
  ],
  page: 1,
  perPage: 10,
  count: 100,
};
