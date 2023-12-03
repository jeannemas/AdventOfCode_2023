import type { Game } from "./types.d.ts";
import { parseGameFromString } from "./utils.ts";

export function day_2_part_2(input: string) {
  const INPUT_LINES = input
    .trim()
    .split("\n")
    .map((line) => line.trim()); // We split the input into lines and remove the trailing whitespaces
  const games: Game[] = []; // We will store the games in this array

  for (const line of INPUT_LINES) {
    games.push(parseGameFromString(line));
  }

  let sum = 0;

  for (const game of games) {
    const maxReds = Math.max(...game.sets.map(({ red }) => red)); // We get the maximum number of red cubes
    const maxGreens = Math.max(...game.sets.map(({ green }) => green)); // We get the maximum number of green cubes
    const maxBlues = Math.max(...game.sets.map(({ blue }) => blue)); // We get the maximum number of blue cubes
    const gamePower = maxReds * maxGreens * maxBlues; // We calculate the game power

    sum += gamePower; // We add the game power to the sum
  }

  return sum;
}

if (import.meta.main) {
  const INPUT_FILE = new URL("./input.txt", import.meta.url); // This is the path to the input file
  const INPUT_FILE_CONTENT = await Deno.readTextFile(INPUT_FILE); // We first need to import the input file

  console.log(day_2_part_2(INPUT_FILE_CONTENT));
}
