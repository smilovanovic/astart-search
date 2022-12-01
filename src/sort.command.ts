import { Command, CommandRunner } from 'nest-commander';
import { GameService } from './game.service';

@Command({
  name: 'sort',
  description: 'A* algo for sorting by color',
  arguments: '<balls>',
  argsDescription: {
    balls:
      'Array of balls specified by color. Four of each kind are required, red (r), blue (b) and green (g). Example: rbgggrrbbrgb',
  },
  options: { isDefault: true },
})
export class SortCommand extends CommandRunner {
  constructor(private gameService: GameService) {
    super();
  }

  // rrrggggbbbrb => 332 with H v1
  async run(passedParam: string[]): Promise<void> {
    const parsedBalls = this.parseBalls(passedParam[0]);
    if (!parsedBalls) {
      console.error(
        'Four balls of each color are required!\nExample: rbgggrrbbrgb',
      );
      return;
    }
    console.log(this.gameService.astar(parsedBalls));
  }

  parseBalls(balls: string): string[] | null {
    const totals = {
      r: 0,
      b: 0,
      g: 0,
    };

    balls.split('').forEach((char) => {
      if (totals[char] !== undefined) totals[char]++;
    });

    return Object.values(totals).every((total) => total === 4)
      ? balls.split('')
      : null;
  }
}
