export function normalizeBlindtestAnswer(value: string): string {
  return value.trim().toLowerCase();
}

export function answersMatch(input: string, expected: string): boolean {
  return normalizeBlindtestAnswer(input) === normalizeBlindtestAnswer(expected);
}
