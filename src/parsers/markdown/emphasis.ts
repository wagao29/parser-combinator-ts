import type { Emphasis } from 'mdast';
import { char } from '../../char';
import { cat, rep } from '../../combinators';
import { anyChar } from '../../primitives';
import type { ParserInput, ParserOutput } from '../../types';
import { diff, map } from '../../util';

// TODO: Supports types other than text for children
export function emphasis(input: ParserInput): ParserOutput<Emphasis> {
  return map(
    cat([char('*'), rep(diff(anyChar, char('*')), 1), char('*')]),
    ([, v]) => {
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
  )(input);
}
