import type { InlineCode } from 'mdast';
import { char } from '../../char';
import { cat, rep } from '../../combinators';
import { anyChar } from '../../primitives';
import type { Parser } from '../../types';
import { diff, map } from '../../util';

export const inlineCode: Parser<InlineCode> = map(
  cat([
    rep(char(' ')),
    char('`'),
    rep(diff(anyChar, char('`'))),
    char('`'),
    rep(char(' '))
  ]),
  ([, , v]) => {
    const inlineCode: InlineCode = {
      type: 'inlineCode',
      value: v.join('').trim()
    };
    return inlineCode;
  }
);
