export function getNutreintData(nutType: string): number {
  const values = {
    fat: 9,
    protein: 4,
    carbs: 4,
    fiber: 2,
  };
  return values[nutType as keyof typeof values];
}
