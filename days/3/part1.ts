import type { Schematic } from "./types.d.ts";
import {
  getPartNumbers,
  getPartNumberValue,
  hasAdjacentSymbol,
} from "./utils.ts";

export function day_3_part_1(input: string) {
  const schematic: Schematic = input
    .trim()
    .split("\n")
    .map((line) => line.trim());
  const partNumbers = getPartNumbers(schematic);

  let sum = 0;

  for (const partNumber of partNumbers) {
    if (!hasAdjacentSymbol(partNumber, schematic)) {
      continue;
    }

    // We add the part number value to the sum
    sum += getPartNumberValue(partNumber, schematic);
  }

  return sum;
}

if (import.meta.main) {
  const INPUT_FILE = new URL("./input.txt", import.meta.url); // This is the path to the input file
  const INPUT_FILE_CONTENT = await Deno.readTextFile(INPUT_FILE); // We first need to import the input file

  console.log(day_3_part_1(INPUT_FILE_CONTENT));
}
