export function day_1_part_2(input: string) {
  const searches = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",

    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  const searchesDigits = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",

    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
  };
  const INPUT_LINES = input
    .trim()
    .split("\n")
    .map((line) => line.trim()); // We split the input into lines and remove the trailing whitespaces

  let total = 0;

  for (const line of INPUT_LINES) {
    const matches: {
      digit: string;
      index: number;
    }[] = [];

    for (const searchee of searches) {
      const regex = new RegExp(searchee);

      let workingLine = line;
      let exec: RegExpExecArray | null;

      // We loop through the matches
      while ((exec = regex.exec(workingLine)) !== null) {
        // We add the match to the matches array
        matches.push({
          digit: searchesDigits[exec[0] as keyof typeof searchesDigits],
          index: exec.index,
        });

        // We replace the searchee with underscores so that we don't match it again
        workingLine = `${workingLine.substring(0, exec.index)}${
          "_".repeat(
            searchee.length,
          )
        }${line.substring(exec.index + searchee.length)}`;
      }
    }

    const digitsStr = matches
      .toSorted((a, b) => a.index - b.index)
      .map(({ digit }) => digit)
      .join(""); // We concatenate the matched digits into a string
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

  console.log(day_1_part_2(INPUT_FILE_CONTENT));
}
