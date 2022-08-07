export const joinObject =
  <A extends Object, B extends Object>(a: A) =>
  (b: B) => ({
    ...a,
    ...b,
  });

export const pick =
  <T extends Record<string, any>>(key: keyof T) =>
  (object: T) =>
    object[key];
