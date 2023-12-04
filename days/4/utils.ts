import type { Card } from "./types.d.ts";

export function parseCards(input: string) {
  const lines = input
    .trim()
    .split("\n")
    .map((line) => line.trim());
  const cards: Card[] = [];

  for (const line of lines) {
    // We use a regex to extract the winning numbers and the player numbers
    const {
      winningNumbers: winningNumbersStr,
      playerNumbers: playerNumbersStr,
    } = line.match(
      /^Card +\d+: +(?<winningNumbers>\d+(?: +\d+)*) \| +(?<playerNumbers>\d+(?: +\d+)*)$/,
    )!.groups!;
    // We convert the strings to arrays of numbers
    const winningNumbers = winningNumbersStr.split(/ +/).map(Number);
    const playerNumbers = playerNumbersStr.split(/ +/).map(Number);

    cards.push({ playerNumbers, winningNumbers });
  }

  return cards;
}
