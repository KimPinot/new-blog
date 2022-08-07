export const joinObject =
  <A extends Object, B extends Object>(a: A) =>
  (b: B) => ({
    ...a,
    ...b,
  });

export const pick =
  <T, K extends keyof T>(key: K) =>
  (object: T) =>
    object[key];
