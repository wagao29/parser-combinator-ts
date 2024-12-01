import type { Digit } from '../../char';
import { char, digit, is } from '../../char';
import { cat, or, rep } from '../../combinators';
import { anyChar } from '../../primitives';
import type { Parser } from '../../types';
import { diff, map, str } from '../../util';

type HexUpperAlpha = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
type HexLowerAlpha = Lowercase<HexUpperAlpha>;
type HexAlpha = HexUpperAlpha | HexLowerAlpha;
type HexDigit = Digit | HexAlpha;

const HEX_ALPHA_REGEX = /^[A-Fa-f]$/;

const cntrl: Parser<string> = is(
  (c): c is string => (c.codePointAt(0) || 0) <= 0x1f
);
const hex: Parser<HexDigit> = or([
  digit,
  is((c): c is HexAlpha => HEX_ALPHA_REGEX.test(c))
]);
const codePoint: Parser<string> = map(
  cat([str('\\u'), rep(hex, 4, 4)]),
  ([, code]) => String.fromCodePoint(Number.parseInt(code.join(''), 16))
);
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
const escape: Parser<string> = or([
  map(str('\\b'), () => '\b'),
  map(str('\\t'), () => '\t'),
  map(str('\\n'), () => '\n'),
  map(str('\\f'), () => '\f'),
  map(str('\\r'), () => '\r'),
  map(str('\\"'), () => '"'),
  map(str('\\/'), () => '/'),
  map(str('\\\\'), () => '\\'),
  codePoint
]);

const stringContent: Parser<string> = map(
  rep(or([diff(anyChar, or([char('"'), char('\\'), cntrl])), escape])),
  (strs) => strs.join('')
);

export const string: Parser<string> = map(
  cat([char('"'), stringContent, char('"')]),
  ([, s]) => s
);
