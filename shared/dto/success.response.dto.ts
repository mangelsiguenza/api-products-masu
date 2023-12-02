import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse<T> {
  @ApiProperty()
  data: T;

  constructor(data?: T) {
    this.data = data;
  }
}
