import { char } from './char';
import { cat } from './combinators';
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

type StrFunc = <T extends string>(s: T) => Parser<T>;

export const str: StrFunc = (s) => (input) => {
  const p = cat([...s].map(char));
  const r = p(input);
  if (r.result === 'fail') return r;
  return {
    result: 'success',
    data: s,
    rest: r.rest
  };
};
