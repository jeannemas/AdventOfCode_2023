import { getMaps } from './utils.ts';

export function part(input: string) {
  const seeds = input
    .match(/^seeds\: (?<seedsStr>\d+(?: \d+)+)\n\n/)!
    .groups!.seedsStr.split(/\s+/)
    .map(Number);
  const maps = getMaps(input);
  const seedsPaths = seeds.map((seed) => [seed] as number[]);

  for (const seedsPath of seedsPaths) {
    for (const map of maps) {
      const mostRecentSeed = seedsPath[seedsPath.length - 1];

      seedsPath.push(map(mostRecentSeed));
    }
  }

  const minSeed = seedsPaths
    .map((seedsPath) => seedsPath[seedsPath.length - 1])
    .reduce((a, b) => Math.min(a, b));

  return minSeed;
}

import.meta.main &&
  console.log(part(await Deno.readTextFile(new URL('./input.txt', import.meta.url))));
