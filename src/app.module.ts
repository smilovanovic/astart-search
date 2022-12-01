import { Module } from '@nestjs/common';
import { SortCommand } from './sort.command';

@Module({
  imports: [],
  providers: [SortCommand],
})
export class AppModule {}
