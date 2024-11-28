import { anyChar } from './primitives';
import type { Parser, ParserInput } from './types';

type CharFunc = <T extends ParserInput[0]>(c: T) => Parser<T>;

export const char: CharFunc = (c) => (input) => {
  const r = anyChar(input);
  if (r.result === 'fail') return r;
  if (r.data !== c) return { result: 'fail' };
  return {
    result: 'success',
    data: c,
    rest: r.rest
  };
};

type IsFunc = <T extends string>(f: (c: ParserInput[0]) => c is T) => Parser<T>;

export const is: IsFunc = (f) => (input) => {
  const r = anyChar(input);
  if (r.result === 'fail') return r;
  if (!f(r.data)) return { result: 'fail' };
  return {
    result: 'success',
    data: r.data,
    rest: r.rest
  };
};

export type UpperAlphabet =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';
export type LowerAlphabet = Lowercase<UpperAlphabet>;
export type Alphabet = UpperAlphabet | LowerAlphabet;
export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

const UPPER_ALPHABET_REGEX = /^[A-Z]$/;
const LOWER_ALPHABET_REGEX = /^[a-z]$/;
const ALPHABET_REGEX = /^[A-Za-z]$/;
const DIGIT_REGEX = /^\d$/;

export const upperAlpha: Parser<UpperAlphabet> = is((c): c is UpperAlphabet =>
  UPPER_ALPHABET_REGEX.test(c)
);

export const lowerAlpha: Parser<LowerAlphabet> = is((c): c is LowerAlphabet =>
  LOWER_ALPHABET_REGEX.test(c)
);

export const alpha: Parser<Alphabet> = is((c): c is Alphabet =>
  ALPHABET_REGEX.test(c)
);

export const digit: Parser<Digit> = is((c): c is Digit => DIGIT_REGEX.test(c));
