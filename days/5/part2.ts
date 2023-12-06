import { getMaps } from './utils.ts';

export function part(input: string) {
  const initialSeeds = input
    .match(/^seeds\: (?<seedsStr>\d+(?: \d+)+)\n\n/)!
    .groups!.seedsStr.split(/\s+/)
    .map(Number);
  const seeds = expandPairs(initialSeeds);
  const maps = getMaps(input);
  const seedsPaths = seeds.map((seed) => [seed] as number[]);

  for (const seedsPath of seedsPaths) {
    for (const map of maps) {
      seedsPath.push(map(seedsPath[seedsPath.length - 1]));
    }
  }

  const minSeed = seedsPaths
    .map((seedsPath) => seedsPath[seedsPath.length - 1])
    .reduce((a, b) => Math.min(a, b));

  return minSeed;
}

function expandPairs(numbers: number[]) {
  const halfLength = numbers.length / 2;
  const numbersExpanded: number[] = [];

  if (!Number.isInteger(halfLength)) {
    throw new Error('Cannot expand pairs of odd length');
  }

  for (let i = 0; i < halfLength; i += 1) {
    const [start, length] = numbers.slice(i * 2, i * 2 + 2);

    for (let j = 0; j < length; j += 1) {
      numbersExpanded.push(start + j);
    }
  }

  return numbersExpanded;
}

// TODO this currently doesn't work because the expanded seeds are to large to fit in memory

import.meta.main &&
  console.log(part(await Deno.readTextFile(new URL('./input.txt', import.meta.url))));
