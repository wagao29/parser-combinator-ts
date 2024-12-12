import type { Heading } from 'mdast';
import { char } from '../../char';
import { cat, rep } from '../../combinators';
import { anyChar } from '../../primitives';
import type { Parser } from '../../types';
import { diff, map } from '../../util';
import { lineEnd } from './lineEnd';

// TODO: Supports types other than text for children
export const heading: Parser<Heading> = map(
  cat([
    rep(char(' ')),
    rep(char('#'), 1, 6, true),
    rep(char(' ')),
    rep(diff(anyChar, lineEnd))
  ]),
  ([, s, , v]) => {
    const heading: Heading = {
      type: 'heading',
      depth: s.length as 1 | 2 | 3 | 4 | 5 | 6,
      children: [
        {
          type: 'text',
          value: v.join('').trim()
        }
      ]
    };
    return heading;
  }
);
