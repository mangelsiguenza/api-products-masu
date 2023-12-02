import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class SearchProductParam {
  @ApiPropertyOptional({
    description: `Search only keys   
    Example: title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images`,
    isArray: true,
  })
  @IsOptional()
  @IsString({ each: true })
  @Type(() => String)
  select?: string[];

  @ApiPropertyOptional({
    description: `Search key product  
    Example: samsung`,
    type: String,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: `Number page  
    Example: 1`,
  })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiPropertyOptional({
    description: `Number of items per page  
    Example:10`,
  })
  @IsOptional()
  @IsNumberString()
  perPage?: number;
}
