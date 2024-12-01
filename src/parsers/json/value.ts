import { char } from '../../char';
import { cat, or } from '../../combinators';
import type { Parser, ParserInput, ParserOutput } from '../../types';
import { list, map, str } from '../../util';
import { bool } from '../bool';
import { number } from './number';
import { string } from './string';
import { whitespace } from './whitespace';

export type ValueType =
  | string
  | number
  | boolean
  | null
  | ValueType[]
  | ObjectType;
export type ObjectType = { [key: string]: ValueType };

const parseNull: Parser<null> = map(str('null'), () => null);

const valueContent: Parser<ValueType> = or<ValueType>([
  string,
  number,
  bool,
  parseNull,
  array,
  object
]);

export function value(input: ParserInput): ParserOutput<ValueType> {
  return map(cat([whitespace, valueContent, whitespace]), ([, v]) => v)(input);
}

const arrayContent: Parser<ValueType[]> = map(
  or([list(value, char(',')), whitespace]),
  (a) => a ?? []
);

export function array(input: ParserInput): ParserOutput<ValueType[]> {
  return map(cat([char('['), arrayContent, char(']')]), ([, a]) => a)(input);
}

const objectKeyValue: Parser<ObjectType> = map(
  cat([whitespace, string, whitespace, char(':'), value]),
  ([, k, , , v]) => ({ [k]: v })
);

const objectContent: Parser<ObjectType> = map(
  or([list(objectKeyValue, char(',')), whitespace]),
  (a) => (a ?? []).reduce((obj, kv) => ({ ...obj, ...kv }), {})
);

export function object(input: ParserInput): ParserOutput<ObjectType> {
  return map(cat([char('{'), objectContent, char('}')]), ([, o]) => o)(input);
}
