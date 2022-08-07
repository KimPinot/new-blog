export const joinObject =
  <A extends Record<string, any>, B extends Record<string, any>>(a: A) =>
  (b: B) => ({
    ...a,
    ...b,
  });
