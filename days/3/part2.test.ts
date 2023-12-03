import { assertEquals } from '../../deps.ts';
import { day_3_part_2 } from './part2.ts';

Deno.test('Day 3 - Part 2', () => {
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
  const expected = 467835;

  // Act
  const result = day_3_part_2(input);

  // Assert
  assertEquals(result, expected);
});
