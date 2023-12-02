import { ApiProperty } from '@nestjs/swagger';

export abstract class DataResponse {
  @ApiProperty({
    description: 'Resource successfully created',
    example: 'Successful operation.',
  })
  public mensaje?: string;

  @ApiProperty({
    description: 'Transaction folio number',
    example: '864232520200521141446',
  })
  public folio: string;
}
