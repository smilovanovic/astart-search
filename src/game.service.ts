import { Injectable } from '@nestjs/common';
import { GameStateNode } from './types';

@Injectable()
export class GameService {
  static SOLUTION = 'rrrrggggbbbb'.split('');

  getKey(n: string[]) {
    return n.join('');
  }

  getH(n: string[]) {
    const tempN = [...n];
    for (let i = 0; i < GameService.SOLUTION.length; i++) {
      const currentEl = tempN.shift();
      if (currentEl === GameService.SOLUTION[i]) continue;
      return tempN.indexOf(GameService.SOLUTION[i]);
    }
    return 0;
  }

  getF(n: string[], g: number) {
    return g + this.getH(n);
  }

  getChildren(node: GameStateNode) {
    const moves: GameStateNode[] = [];
    for (let i = 0; i < node.n.length - 1; i++) {
      if (node.n[i] !== node.n[i + 1]) {
        const n = [
          ...node.n.slice(0, i),
          node.n[i + 1],
          node.n[i],
          ...node.n.slice(i + 2),
        ];
        const g = node.g + 1;
        moves.push({
          n,
          g,
          parent: node,
          key: this.getKey(n),
          f: this.getF(n, g),
        });
      }
    }
    return moves;
  }

  astar(n: string[]): { moves: string[]; closedStates: number } {
    const start: GameStateNode = {
      n,
      key: this.getKey(n),
      g: 0,
      f: this.getH(n),
    };
    const openList: Record<string, GameStateNode> = {};
    const closedList: Record<string, number> = {};
    openList[start.key] = start;

    while (Object.values(openList).length > 0) {
      let currentNode: GameStateNode = null;
      Object.values(openList).forEach((node, index) => {
        if (index === 0) {
          currentNode = node;
        } else if (node.f < currentNode.f) {
          currentNode = node;
        }
      });

      if (currentNode.key === this.getKey(GameService.SOLUTION)) {
        let curr = currentNode;
        const ret: string[] = [];
        while (curr.parent) {
          ret.push(curr.key);
          curr = curr.parent;
        }
        ret.push(curr.key);
        return {
          moves: ret.reverse(),
          closedStates: Object.keys(closedList).length,
        };
      }

      delete openList[currentNode.key];
      closedList[currentNode.key] = 1;

      this.getChildren(currentNode).forEach((child) => {
        if (closedList[child.key]) {
          return;
        }

        if (!openList[child.key]) {
          openList[child.key] = child;
        } else if (openList[child.key].g > child.g) {
          openList[child.key].g = child.g;
          openList[child.key].parent = child.parent;
          openList[child.key].f = this.getF(child.n, child.g);
        }
      });
    }

    return {
      moves: [],
      closedStates: 0,
    };
  }
}
