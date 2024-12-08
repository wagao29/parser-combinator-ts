import type { Strong } from 'mdast';
import { char } from '../../char';
import { cat, rep } from '../../combinators';
import { anyChar } from '../../primitives';
import type { ParserInput, ParserOutput } from '../../types';
import { diff, map } from '../../util';

// TODO: Supports types other than text for children
export function strong(input: ParserInput): ParserOutput<Strong> {
  return map(
    cat([
      rep(char('*'), 2, 2, true),
      rep(diff(anyChar, char('*')), 1),
      rep(char('*'), 2, 2, true)
    ]),
    ([, v]) => {
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
  )(input);
}
