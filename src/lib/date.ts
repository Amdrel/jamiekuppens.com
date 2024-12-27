/**
 * Formats an ISO 8601 date (time ignored) to be Month, Day Year.
 */
export function formatDate(date: string): string {
  const parsedDate = new Date(date);
  const timeoneOffset = parsedDate.getTimezoneOffset() * 60_000;

  return new Date(parsedDate.getTime() + timeoneOffset).toLocaleDateString(
    "en",
    { year: "numeric", month: "long", day: "numeric" },
  );
}
