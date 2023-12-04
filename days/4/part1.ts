import { parseCards } from "./utils.ts";

export function day_4_part_1(input: string) {
  const cards = parseCards(input);

  let score = 0;

  for (const card of cards) {
    let cardScore = 0;

    for (const playerNumber of card.playerNumbers) {
      if (card.winningNumbers.includes(playerNumber)) {
        // If the player number is in the winning numbers, we add the card score
        cardScore = cardScore === 0 ? 1 : cardScore * 2;
      }
    }

    score += cardScore;
  }

  return score;
}

if (import.meta.main) {
  const INPUT_FILE = new URL("./input.txt", import.meta.url); // This is the path to the input file
  const INPUT_FILE_CONTENT = await Deno.readTextFile(INPUT_FILE); // We first need to import the input file

  console.log(day_4_part_1(INPUT_FILE_CONTENT));
}
