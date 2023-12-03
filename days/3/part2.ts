import type { Cell, Schematic } from "./types.d.ts";
import {
  getAdjacentCells,
  getPartNumbers,
  getPartNumberValue,
} from "./utils.ts";

export function day_3_part_2(input: string) {
  const schematic: Schematic = input
    .trim()
    .split("\n")
    .map((line) => line.trim());

  const partNumbers = getPartNumbers(schematic);
  const gearCells = getGearCells(schematic);

  let sum = 0;

  for (const gearCell of gearCells) {
    const adjacentCells = getAdjacentCells({ ...gearCell, span: 1 }, schematic);
    const adjacentPartNumbers = partNumbers.filter((partNumber) =>
      adjacentCells.some(
        (cell) =>
          cell.x >= partNumber.x &&
          cell.x < partNumber.x + partNumber.span &&
          cell.y === partNumber.y,
      )
    );
    // We filter out the duplicate part numbers
    const uniqueAdjacentPartNumbers = adjacentPartNumbers.filter(
      (partNumber, index, self) =>
        self.findIndex(
          ({ span, x, y }) =>
            span === partNumber.span && x === partNumber.x &&
            y === partNumber.y,
        ) === index,
    );

    if (uniqueAdjacentPartNumbers.length === 2) {
      sum += getPartNumberValue(uniqueAdjacentPartNumbers[0], schematic) *
        getPartNumberValue(uniqueAdjacentPartNumbers[1], schematic);
    }
  }

  return sum;
}

function getGearCells(schematic: Schematic) {
  const gearCells: Cell[] = [];

  for (const [y, line] of schematic.entries()) {
    for (const [x, cell] of line.split("").entries()) {
      if (cell !== "*") {
        continue;
      }

      gearCells.push({ x, y });
    }
  }

  return gearCells;
}

if (import.meta.main) {
  const INPUT_FILE = new URL("./input.txt", import.meta.url); // This is the path to the input file
  const INPUT_FILE_CONTENT = await Deno.readTextFile(INPUT_FILE); // We first need to import the input file

  console.log(day_3_part_2(INPUT_FILE_CONTENT));
}
