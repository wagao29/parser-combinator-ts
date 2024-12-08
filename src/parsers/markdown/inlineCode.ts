import type { InlineCode } from 'mdast';
import { char } from '../../char';
import { cat, rep } from '../../combinators';
import { anyChar } from '../../primitives';
import type { ParserInput, ParserOutput } from '../../types';
import { diff, map } from '../../util';

export function inlineCode(input: ParserInput): ParserOutput<InlineCode> {
  return map(
    cat([char('`'), rep(diff(anyChar, char('`'))), char('`')]),
    ([, v]) => {
      const inlineCode: InlineCode = {
        type: 'inlineCode',
        value: v.join('')
      };
      return inlineCode;
    }
  )(input);
}
