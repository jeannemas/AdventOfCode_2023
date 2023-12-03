import { assertEquals } from "../../deps.ts";
import { day_3_part_1 } from "./part1.ts";

Deno.test("Day 3 - Part 1", () => {
  // Arrange
  const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
  const expected = 4361;

  // Act
  const result = day_3_part_1(input);

  // Assert
  assertEquals(result, expected);
});
