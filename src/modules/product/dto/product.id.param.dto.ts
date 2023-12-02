import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ProductIdParam {
  @ApiProperty({
    description: 'Search product id',
    type: String,
    example: 1,
    default: 1,
  })
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
