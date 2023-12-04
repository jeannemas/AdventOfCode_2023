import { parseCards } from "./utils.ts";

export function day_4_part_2(input: string) {
  const cards = parseCards(input).map((card) => ({ card, count: 1 }));

  for (let index = 0; index < cards.length; index += 1) {
    const { card, count } = cards[index];
    // We get the numbers that are both in the player numbers and the winning numbers
    const matchingNumbers = card.playerNumbers.filter((playerNumber) =>
      card.winningNumbers.includes(playerNumber)
    );
    // We get the count of matching numbers
    const matchingNumbersCount = matchingNumbers.length;

    // If the card has no matching numbers, we can skip it
    if (matchingNumbersCount === 0) {
      continue;
    }

    // For each unit of count, we evaluate the next cards
    for (let countIndex = 0; countIndex < count; countIndex += 1) {
      // We add one to the count of the next cards
      for (
        let indexBis = index + 1;
        indexBis < index + 1 + matchingNumbersCount;
        indexBis += 1
      ) {
        cards[indexBis].count += 1;
      }
    }
  }

  return cards.reduce((sum, card) => sum + card.count, 0); // We sum the count of all cards
}

if (import.meta.main) {
  const INPUT_FILE = new URL("./input.txt", import.meta.url); // This is the path to the input file
  const INPUT_FILE_CONTENT = await Deno.readTextFile(INPUT_FILE); // We first need to import the input file

  console.log(day_4_part_2(INPUT_FILE_CONTENT));
}
