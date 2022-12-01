import { Command, CommandRunner } from 'nest-commander';

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
  async run(passedParam: string[]): Promise<void> {
    if (!this.validateBalls(passedParam[0])) {
      console.error(
        'Four balls of each color are required!\nExample: rbgggrrbbrgb',
      );
      return;
    }
  }

  validateBalls(balls: string) {
    const totals = {
      r: 0,
      b: 0,
      g: 0,
    };

    balls.split('').forEach((char) => {
      if (totals[char]) totals[char]++;
    });

    return Object.values(totals).every((total) => total === 4);
  }
}
