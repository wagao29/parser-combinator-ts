import type { Strong } from 'mdast';
import { char } from '../../char';
import { cat, rep } from '../../combinators';
import { anyChar } from '../../primitives';
import type { Parser } from '../../types';
import { diff, map } from '../../util';

// TODO: Supports types other than text for children
export const strong: Parser<Strong> = map(
  cat([
    rep(char(' ')),
    rep(char('*'), 2, 2, true),
    rep(diff(anyChar, char('*')), 1),
    rep(char('*'), 2, 2, true),
    rep(char(' '))
  ]),
  ([, , v]) => {
    const strong: Strong = {
      type: 'strong',
      children: [
        {
          type: 'text',
          value: v.join('')
        }
      ]
    };
    return strong;
  }
);
