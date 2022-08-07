export const promiseAll = <T extends Promise<any>[]>(m: T) => Promise.all(m);
