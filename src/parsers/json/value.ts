import { cat, or } from '../../combinators';
import type { Parser, ParserInput, ParserOutput } from '../../types';
import { map, str } from '../../util';
import { bool } from '../bool';
import { number } from './number';
import { string } from './string';
import { whitespace } from './whitespace';

export type ValueType = string | number | boolean | null;

const parseNull: Parser<null> = map(str('null'), () => null);

const valueContent: Parser<ValueType> = or<ValueType>([
  string,
  number,
  bool,
  parseNull
]);

export function value(input: ParserInput): ParserOutput<ValueType> {
  return map(cat([whitespace, valueContent, whitespace]), ([, v]) => v)(input);
}
