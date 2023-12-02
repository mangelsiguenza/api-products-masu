import { ApiProperty } from '@nestjs/swagger';

export class BadRequestModel {
  @ApiProperty({
    description: 'Error code.',
    example: '400-Product-${servicio}-400201',
  })
  public codigo: string;

  @ApiProperty({
    description: 'Error message.',
    example:
      'The server could not interpret the request due to invalid syntax.',
  })
  public message: string;

  @ApiProperty({
    description: 'Transaction folio number.',
    example: '864232520200521141446',
  })
  public folio: string;

  @ApiProperty({
    description: 'Help routes to attend to the error.',
  })
  public info: string;

  @ApiProperty({
    description: 'List of error details.',
    example: ['Incorrect parameters.'],
  })
  public detalles: string[];
}
