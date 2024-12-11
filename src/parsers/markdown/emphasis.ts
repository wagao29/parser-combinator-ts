import type { Emphasis } from 'mdast';
import { char } from '../../char';
import { cat, rep } from '../../combinators';
import { anyChar } from '../../primitives';
import type { Parser } from '../../types';
import { diff, map } from '../../util';

// TODO: Supports types other than text for children
export const emphasis: Parser<Emphasis> = map(
  cat([
    rep(char(' ')),
    char('*'),
    rep(diff(anyChar, char('*')), 1),
    char('*'),
    rep(char(' '))
  ]),
  ([, , v]) => {
    const emphasis: Emphasis = {
      type: 'emphasis',
      children: [
        {
          type: 'text',
          value: v.join('')
        }
      ]
    };
    return emphasis;
  }
);
