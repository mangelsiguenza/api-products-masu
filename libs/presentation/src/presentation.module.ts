import { ExceptionFilterModule } from '@app/presentation';
import { Module } from '@nestjs/common';

@Module({
  imports: [ExceptionFilterModule],
  exports: [ExceptionFilterModule],
})
export class PresentationModule {}
