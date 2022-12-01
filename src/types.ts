export type GameStateNode = {
  n: string[];
  g: number;
  parent?: GameStateNode;
  key: string;
  f: number;
};
