import { ApiProperty } from '@nestjs/swagger';

export class NotFoundModel {
  @ApiProperty({
    description: 'Error code.',
    example: '404-Product-${servicio}-404204',
  })
  public codigo: string;

  @ApiProperty({
    description: 'Error message.',
    example: 'The requested resource has not been found.',
  })
  public mensaje: string;

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
    example: ['Resource not found'],
  })
  public detalles: string[];
}
