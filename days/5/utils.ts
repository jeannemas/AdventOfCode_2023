export function getMaps(input: string) {
  return [...input.matchAll(/\w+-to-\w+ map\:\n(?<mapping>(?:\d+ \d+ \d+\n?)+)\n/g)]
    .map(({ groups }) => ({
      ...(groups as {
        mapping: string;
      }),
    }))
    .map((map) =>
      map.mapping
        .trim()
        .split('\n')
        .map(
          (row) =>
            row.split(/\s+/).map(Number) as [
              destinationRangeStart: number,
              sourceRangeStart: number,
              rangeLength: number
            ]
        )
    )
    .map((map) => (value: number) => {
      // Map using the mapping from map.mapping
      const mapping = map.find(
        ([, sourceRangeStart, rangeLength]) =>
          sourceRangeStart <= value && value < sourceRangeStart + rangeLength
      );

      if (!mapping) {
        return value;
      }

      const [destinationRangeStart, sourceRangeStart] = mapping;

      return value - sourceRangeStart + destinationRangeStart;
    });
}
