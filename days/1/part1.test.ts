import { assertEquals } from "../../deps.ts";
import { day_1_part_1 } from "./part1.ts";

Deno.test("Day 1 - Part 1", () => {
  // Arrange
  const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;
  const expected = 142;

  // Act
  const result = day_1_part_1(input);

  // Assert
  assertEquals(result, expected);
});
