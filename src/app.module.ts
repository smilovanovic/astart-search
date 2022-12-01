import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { SortCommand } from './sort.command';

@Module({
  imports: [],
  providers: [SortCommand, GameService],
})
export class AppModule {}
