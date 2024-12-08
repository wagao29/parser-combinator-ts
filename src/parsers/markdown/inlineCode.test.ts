import type { InlineCode } from 'mdast';

import type { ParserOutput } from '../../types';
import { inlineCode } from './inlineCode';

describe('inlineCode', () => {
  const parser = inlineCode;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<InlineCode>>({
      result: 'fail'
    });
  });

  test('Input "`inline code"', () => {
    const input = [...'`inline code'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<InlineCode>>({
      result: 'fail'
    });
  });

  test('Input "inline code`"', () => {
    const input = [...'inline code`'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<InlineCode>>({
      result: 'fail'
    });
  });

  test('Input "`inline code`"', () => {
    const input = [...'`inline code`'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<InlineCode>>({
      result: 'success',
      data: {
        type: 'inlineCode',
        value: 'inline code'
      },
      rest: []
    });
  });
});
