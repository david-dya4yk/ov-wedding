export const MAX_GUESTS = 10;
export const MAX_NAME_LENGTH = 200;
export const MAX_NOTE_LENGTH = 2000;

export function sanitizeGuests(guests: readonly string[]): string[] {
  return guests
    .map((guest) => guest.trim())
    .filter((guest) => guest !== "")
    .slice(0, MAX_GUESTS);
}
