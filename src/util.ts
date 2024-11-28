import { char } from './char';
import { cat, rep } from './combinators';
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

interface Some<T> {
  status: 'some';
  value: T;
}
interface None {
  status: 'none';
}
export type Option<T> = Some<T> | None;

type OptFunc = <T>(p: Parser<T>) => Parser<Option<T>>;

export const opt: OptFunc = (p) => (input) => {
  const r = rep(p, 0, 1)(input);
  if (r.result === 'fail') return r;
  return {
    result: 'success',
    data:
      r.data.length === 0
        ? { status: 'none' }
        : { status: 'some', value: r.data[0] },
    rest: r.rest
  };
};
