import { HttpModule, HttpService } from '@nestjs/axios';
import { HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';
import configuration from '../../../config/configuration';
import { ListProduct, ProductResponse, SearchProductParam } from '../dto';
import { GetProductException } from '../exceptions';
import { ProductService } from './product.service';

describe('Product Service', () => {
  let service: ProductService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] }), HttpModule],
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    httpService = module.get<HttpService>(HttpService);
  });
  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When GetProductID', () => {
    it('should return product by id', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(mockAxiosResponse));
      const productId = 1;
      const result = await service.getProductById({ id: productId });

      expect(result.id).toEqual(productId);
      expect(result).toEqual(mockProductResponse);
    });

    it('should return throw throw exception type GetProductException', async () => {
      const productId = 21212122;
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() =>
          observableMock(
            HttpStatus.NOT_FOUND,
            `Product with id ${productId} not found`,
          ),
        );

      await expect(
        service.getProductById({ id: productId }),
      ).rejects.toThrowError(GetProductException);
    });
  });

  describe('When GetProducts ', () => {
    const params: SearchProductParam = {
      select: ['title', 'price', 'stock'],
      page: 1,
      perPage: 10,
      search: 'phone',
    };
    it('should return products by params', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(mockProductsAxiosResponse));
      const result = await service.getProducts(params);

      expect(result.products.length).toEqual(2);
      expect(result).toEqual({
        products: mockProducts,
        page: 1,
        count: 2,
        perPage: 10,
      });
    });

    it('should return throw throw exception type GetProductException', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() =>
          observableMock(HttpStatus.NOT_FOUND, 'error search products'),
        );

      await expect(service.getProducts(params)).rejects.toThrowError(
        GetProductException,
      );
    });
  });
});

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

const mockAxiosResponse: AxiosResponse = {
  data: mockProductResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
} as AxiosResponse;

const mockProducts: ProductResponse[] = [
  {
    id: 1,
    title: 'iPhone 9',
    price: 549,
    stock: 100,
  },
  {
    id: 2,
    title: 'iPhone x',
    price: 849,
    stock: 90,
  },
];
const mockProductsAxiosResponse: AxiosResponse = {
  data: {
    products: mockProducts,
    skip: 0,
    limit: 10,
    total: 2,
  } as ListProduct,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
} as AxiosResponse;

const NotProductException = (status: number, message: string) => {
  return {
    message,
    response: {
      status: status,
    },
  } as AxiosError;
};

const observableMock = (
  status: HttpStatus,
  message: string,
): Observable<any> => {
  return new Observable((o) => o.error(NotProductException(status, message)));
};
