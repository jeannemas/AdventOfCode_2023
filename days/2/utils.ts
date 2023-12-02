import type { Game } from './types.d.ts';

export function parseGameFromString(str: string) {
  // We use regular expressions to parse the input string
  const { gameId: gameIdAsStr, sets: setsAsStr } = str.match(/^Game (?<gameId>\d+): (?<sets>.+)+$/)!
    .groups!;
  // We split the sets into an array of strings
  const sets = setsAsStr
    .trim()
    .split(';')
    .map((set) => {
      // We split the set into an array of strings
      const setParts = set
        .trim()
        .split(',')
        .map((part) => part.trim());

      let red = 0;
      let green = 0;
      let blue = 0;

      // We iterate over the set parts and add the values to the corresponding color
      for (const part of setParts) {
        const {
          red: redAsStr = '0',
          green: greenAsStr = '0',
          blue: blueAsStr = '0',
        } = part.match(/^((?<red>\d+) red|(?<green>\d+) green|(?<blue>\d+) blue)$/)!.groups!;

        red += +redAsStr;
        green += +greenAsStr;
        blue += +blueAsStr;
      }

      return {
        red,
        green,
        blue,
      };
    });

  return {
    id: +gameIdAsStr,
    sets,
  } satisfies Game;
}
