export function round(number: number, decimal?: number): number {
  const factorOfTen = Math.pow(10, decimal || 0)
  return Math.round(number * factorOfTen) / factorOfTen
}
