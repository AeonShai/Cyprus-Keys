/**
 * Format a price amount and currency code into a display string.
 * e.g. formatPrice(285000, "GBP") → "£285,000"
 */
export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
