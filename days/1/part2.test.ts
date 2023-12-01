import { assertEquals } from '../../deps.ts';
import { day_1_part_2 } from './part2.ts';

Deno.test('Day 1 - Part 2', () => {
  // Arrange
  const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
  const expected = 281;

  // Act
  const result = day_1_part_2(input);
  // Assert
  assertEquals(result, expected);
});
