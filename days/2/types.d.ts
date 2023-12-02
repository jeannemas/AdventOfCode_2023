export type Game = {
  id: number;
  sets: GameSet[];
};
export type GameSet = {
  red: number;
  green: number;
  blue: number;
};
