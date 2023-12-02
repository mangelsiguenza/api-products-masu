import { ProductResponse } from './product.dto';

export interface ProductsResponse {
  products: ProductResponse[];
  page: number;
  perPage: number;
  count: number;
}
