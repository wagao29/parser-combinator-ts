import type { Parser } from './types';

type MapFunc = <T, U>(p: Parser<T>, f: (a: T) => U) => Parser<U>;

export const map: MapFunc = (p, f) => (input) => {
  const r = p(input);
  if (r.result === 'fail') return r;
  return {
    result: 'success',
    data: f(r.data),
    rest: r.rest
  };
};
