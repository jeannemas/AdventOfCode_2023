export function day_1_part_1(input: string) {
  const INPUT_LINES = input
    .trim()
    .split("\n")
    .map((line) => line.trim()); // We split the input into lines and remove the trailing whitespaces

  let total = 0;

  for (const line of INPUT_LINES) {
    const digitsStr = line.replace(/[^\d]/g, ""); // We remove all non-digit characters
    const firstDigit = digitsStr[0]; // We get the first digit
    const lastDigit = digitsStr[digitsStr.length - 1]; // We get the last digit
    const intAsStr = `${firstDigit}${lastDigit}`; // We concatenate the two digits into a string
    const int = +intAsStr; // We convert the string into a number

    // We check that the number is between 0 and 100
    if (!(0 < int && int < 100)) {
      throw new Error(`The number is not between 0 and 100: ${int}`);
    }

    total += int; // We add the number to the total
  }

  return total;
}

if (import.meta.main) {
  const INPUT_FILE = new URL("./input.txt", import.meta.url); // This is the path to the input file
  const INPUT_FILE_CONTENT = await Deno.readTextFile(INPUT_FILE); // We first need to import the input file

  console.log(day_1_part_1(INPUT_FILE_CONTENT));
}
