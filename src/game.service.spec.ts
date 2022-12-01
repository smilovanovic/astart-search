import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  describe('getH', () => {
    it('should have smaller value the closer the state is to the result', () => {
      const r0 = service.getH('rrrrggggbbbb'.split(''));
      const r1 = service.getH('rrrggggbbbrb'.split(''));
      const r2 = service.getH('rrgrgggbbbrb'.split(''));

      expect(r0).toBeLessThan(r1);
      expect(r1).toBeLessThan(r2);
    });
  });
});
