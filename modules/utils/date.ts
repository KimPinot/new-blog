export function dateWithoutTimezone(date: Date) {
  return new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
}
