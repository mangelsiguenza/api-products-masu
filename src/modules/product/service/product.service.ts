import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { catchError, lastValueFrom, map, throwError } from 'rxjs';
import {
  ListProduct,
  ProductIdParam,
  ProductResponse,
  ProductsResponse,
  SearchProductParam,
} from '../dto';
import { GetProductException } from '../exceptions';

@Injectable()
export class ProductService {
  private readonly baseUrl: string;
  constructor(
    private readonly configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.baseUrl = this.configService.get<string>('product.basePath');
  }

  async getProductById(param: ProductIdParam): Promise<ProductResponse> {
    const req = this.httpService
      .get(`${this.baseUrl}/${param.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((response: AxiosResponse<ProductResponse>) => response.data),
        catchError((e) =>
          throwError(() => {
            Logger.error(e);
            throw new GetProductException(
              e?.response?.data?.message ||
                'An error occurred while querying the product.',
            );
          }),
        ),
      );

    return lastValueFrom(req);
  }

  async getProducts(query: SearchProductParam): Promise<ProductsResponse> {
    const searchPath = this.configService.get<string>('product.path.search');
    const perPage = +query?.perPage || 10;

    const searchParams = { q: query?.search || '' };
    if (query.select)
      Object.assign(searchParams, {
        select: Array.isArray(query.select)
          ? query.select.join(',')
          : query.select || '',
      });

    if (query.page)
      Object.assign(searchParams, { skip: (query.page - 1) * perPage });

    Object.assign(searchParams, { limit: perPage });

    const urlSearchParams = new URLSearchParams({ ...searchParams });
    const data: ListProduct = await lastValueFrom(
      this.httpService
        .get(`${searchPath}?${urlSearchParams.toString()}`, {
          baseURL: this.baseUrl,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .pipe(
          map((response: AxiosResponse<ListProduct>) => response.data),
          catchError((e) =>
            throwError(() => {
              Logger.error(e);
              throw new GetProductException(
                e?.response?.data?.message ||
                  'An error occurred while obtaining the products.',
              );
            }),
          ),
        ),
    );

    return <ProductsResponse>{
      products: data?.products || [],
      page: +query?.page || 1,
      perPage: +query?.perPage || data.limit,
      count: +data.total,
    };
  }
}
