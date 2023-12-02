/**
 * Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.
 * What is the sum of the IDs of those games?
 */
import type { Game } from './types.d.ts';
import { parseGameFromString } from './utils.ts';

const MAX_RED = 12; // We define the maximum number of red cubes
const MAX_GREEN = 13; // We define the maximum number of green cubes
const MAX_BLUE = 14; // We define the maximum number of blue cubes

export function day_2_part_1(input: string) {
  const INPUT_LINES = input
    .trim()
    .split('\n')
    .map((line) => line.trim()); // We split the input into lines and remove the trailing whitespaces
  const games: Game[] = []; // We will store the games in this array

  // We parse the input lines into games
  for (const line of INPUT_LINES) {
    games.push(parseGameFromString(line));
  }

  let sum = 0;

  for (const game of games) {
    // We check if the game is valid
    const isGameValid = game.sets.every(
      ({ red, green, blue }) => red <= MAX_RED && green <= MAX_GREEN && blue <= MAX_BLUE
    );

    if (isGameValid) {
      // If the game is valid, we add its ID to the sum
      sum += game.id;
    }
  }

  return sum;
}

if (import.meta.main) {
  const INPUT_FILE = new URL('./input.txt', import.meta.url); // This is the path to the input file
  const INPUT_FILE_CONTENT = await Deno.readTextFile(INPUT_FILE); // We first need to import the input file

  console.log(day_2_part_1(INPUT_FILE_CONTENT));
}
