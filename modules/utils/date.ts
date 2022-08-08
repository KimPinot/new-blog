export function dateWithoutTimezone(date: number) {
  const _ = new Date(date);
  return new Date(_.valueOf() + _.getTimezoneOffset() * 60 * 1000);
}
