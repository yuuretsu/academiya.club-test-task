export function compose<A, B>(f1: (arg: A) => B): (arg: A) => B;
export function compose<A, B, C>(f2: (arg: B) => C, f1: (arg: A) => B): (arg: A) => C;
export function compose<A, B, C, D>(f3: (arg: C) => D, f2: (arg: B) => C, f1: (arg: A) => B): (arg: A) => D;
export function compose<A, B, C, D, E>(f4: (arg: D) => E, f3: (arg: C) => D, f2: (arg: B) => C, f1: (arg: A) => B): (arg: A) => E;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compose(...fns: Array<(arg: any) => any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (initialValue: any) => {
    return fns.reduceRight((acc, fn) => fn(acc), initialValue);
  };
}