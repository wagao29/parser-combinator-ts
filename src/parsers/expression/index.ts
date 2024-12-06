//           <expr> ::= <term> [ ("+" | "-") <term> ]*
//           <term> ::= <factor> [ ("*" | "/") <factor> ]*
//         <factor> ::= <number> | "(" <expr> ")"
//         <number> ::= "0" | <non-zero-digit> <digit>*
//          <digit> ::= "0" | <non-zero-digit>
// <non-zero-digit> ::= "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

import type { Digit } from '../../char';
import { char, digit } from '../../char';
import { cat, or, rep } from '../../combinators';
import type { Parser, ParserInput, ParserOutput } from '../../types';
import { diff, map } from '../../util';

const nonZeroDigit: Parser<Digit> = diff(digit, char('0'));
const zeroNumber: Parser<0> = map(char('0'), () => 0);
const nonZeroNumber: Parser<number> = map(
  cat([nonZeroDigit, rep(digit)]),
  ([first, rest]) => Number.parseInt([first, ...rest].join(''), 10)
);
const numbers: Parser<number> = or([zeroNumber, nonZeroNumber]);

export function expr(input: ParserInput): ParserOutput<number> {
  return map(
    cat([term, rep(cat([or([char('+'), char('-')]), term]))]),
    ([first, rest]) => {
      return rest.reduce((lhs, [op, rhs]) => {
        if (op === '+') return lhs + rhs;
        return lhs - rhs;
      }, first);
    }
  )(input);
}

function term(input: ParserInput): ParserOutput<number> {
  return map(
    cat([factor, rep(cat([or([char('*'), char('/')]), factor]))]),
    ([first, rest]) => {
      return rest.reduce((lhs, [op, rhs]) => {
        if (op === '*') return lhs * rhs;
        return lhs / rhs;
      }, first);
    }
  )(input);
}

function factor(input: ParserInput): ParserOutput<number> {
  return or([numbers, map(cat([char('('), expr, char(')')]), ([, n]) => n)])(
    input
  );
}
