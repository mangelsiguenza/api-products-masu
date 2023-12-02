import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorModel {
  @ApiProperty({
    description: 'Error code.',
    default: '500.Product-${servicio}-500203',
  })
  public codigo: string;

  @ApiProperty({
    description: 'Error message.',
    default: 'Something unexpected happened.',
  })
  public mensaje: string;

  @ApiProperty({
    description: 'Transaction folio number',
    example: '864232520200521141446',
  })
  public folio: string;

  @ApiProperty({
    description: 'Help routes to attend to the error',
  })
  public info: string;

  @ApiProperty({
    description: 'Shows detailed error information.',
    example: ['Internal server error.'],
  })
  public detalles?: string[];
}
