import type { Cell, PartNumber, Schematic } from './types.d.ts';

export function getAdjacentCells(partNumber: PartNumber, schematic: Schematic) {
  const schematicXSpan = schematic[0]?.length ?? 0;
  const schematicYSpan = schematic.length;
  const hasCellsOnTop = partNumber.y - 1 >= 0;
  const hasCellsOnRight = partNumber.x + partNumber.span < schematicXSpan;
  const hasCellsOnBottom = partNumber.y + 1 < schematicYSpan;
  const hasCellsOnLeft = partNumber.x - 1 >= 0;
  const topLeftCell =
    hasCellsOnTop && hasCellsOnLeft
      ? ({ x: partNumber.x - 1, y: partNumber.y - 1 } satisfies Cell)
      : null;
  const topRightCell =
    hasCellsOnTop && hasCellsOnRight
      ? ({
          x: partNumber.x + partNumber.span,
          y: partNumber.y - 1,
        } satisfies Cell)
      : null;
  const bottomLeftCell =
    hasCellsOnBottom && hasCellsOnLeft
      ? ({ x: partNumber.x - 1, y: partNumber.y + 1 } satisfies Cell)
      : null;
  const bottomRightCell =
    hasCellsOnBottom && hasCellsOnRight
      ? ({
          x: partNumber.x + partNumber.span,
          y: partNumber.y + 1,
        } satisfies Cell)
      : null;
  const topCells = hasCellsOnTop
    ? [...Array.from({ length: partNumber.span }).keys()].map(
        (x) => ({ x: partNumber.x + x, y: partNumber.y - 1 } satisfies Cell)
      )
    : [];
  const leftCells = hasCellsOnLeft
    ? [...Array.from({ length: 1 }).keys()].map(
        (y) => ({ x: partNumber.x - 1, y: partNumber.y + y } satisfies Cell)
      )
    : [];
  const bottomCells = hasCellsOnBottom
    ? [...Array.from({ length: partNumber.span }).keys()].map(
        (x) => ({ x: partNumber.x + x, y: partNumber.y + 1 } satisfies Cell)
      )
    : [];
  const rightCells = hasCellsOnRight
    ? [...Array.from({ length: 1 }).keys()].map(
        (y) =>
          ({
            x: partNumber.x + partNumber.span,
            y: partNumber.y + y,
          } satisfies Cell)
      )
    : [];

  return [
    topLeftCell,
    ...topCells,
    topRightCell,
    ...leftCells,
    ...rightCells,
    bottomLeftCell,
    ...bottomCells,
    bottomRightCell,
  ].filter((cell): cell is Cell => cell !== null);
}
export function getPartNumber(cell: Cell, schematic: Schematic) {
  const partNumber = { span: 1, x: cell.x, y: cell.y } satisfies PartNumber;

  // Left side
  while (partNumber.x - 1 >= 0 && /\d/.test(schematic[partNumber.y][partNumber.x - 1])) {
    partNumber.x -= 1;
  }

  // Right side
  while (
    partNumber.x + partNumber.span < schematic[partNumber.y].length &&
    /\d/.test(schematic[partNumber.y][partNumber.x + partNumber.span])
  ) {
    partNumber.span += 1;
  }

  return partNumber;
}
export function getPartNumbers(schematic: Schematic) {
  const partNumbers: PartNumber[] = [];

  for (const [y, line] of schematic.entries()) {
    for (const [x, cell] of line.split('').entries()) {
      if (!/\d/.test(cell)) {
        continue;
      }

      const partNumber = getPartNumber({ x, y }, schematic);

      if (
        partNumbers.find(
          ({ span, x, y }) => span === partNumber.span && x === partNumber.x && y === partNumber.y
        )
      ) {
        continue;
      }

      partNumbers.push(partNumber);
    }
  }

  return partNumbers;
}
export function getPartNumberValue(partNumber: PartNumber, schematic: Schematic) {
  return +schematic[partNumber.y].substring(partNumber.x, partNumber.x + partNumber.span);
}
export function hasAdjacentSymbol(partNumber: PartNumber, schematic: Schematic) {
  const adjacentCells = getAdjacentCells(partNumber, schematic);

  return adjacentCells.some((cell) => schematic[cell.y][cell.x] !== '.');
}
