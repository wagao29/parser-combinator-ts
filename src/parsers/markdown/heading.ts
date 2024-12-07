import type { Heading } from 'mdast';
import { char } from '../../char';
import { cat, rep } from '../../combinators';
import { anyChar } from '../../primitives';
import type { ParserInput, ParserOutput } from '../../types';
import { map } from '../../util';

// TODO: Supports types other than text for children
export function heading(input: ParserInput): ParserOutput<Heading> {
  return map(
    cat([rep(char('#'), 1, 6, true), rep(char(' ')), rep(anyChar)]),
    ([s, , v]) => {
      const heading: Heading = {
        type: 'heading',
        depth: s.length as 1 | 2 | 3 | 4 | 5 | 6,
        children: [
          {
            type: 'text',
            value: v.join('')
          }
        ]
      };
      return heading;
    }
  )(input);
}
