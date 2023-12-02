import { ProductResponse } from './product.dto';

export class ListProduct {
  products?: ProductResponse[];
  limit?: number;
  skip?: number;
  total?: number;
}
