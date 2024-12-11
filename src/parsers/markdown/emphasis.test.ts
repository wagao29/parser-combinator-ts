import type { Emphasis } from 'mdast';

import type { ParserOutput } from '../../types';
import { emphasis } from './emphasis';

describe('emphasis', () => {
  const parser = emphasis;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Emphasis>>({
      result: 'fail'
    });
  });

  test('Input "**emphasis text**"', () => {
    const input = [...'**emphasis text**'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Emphasis>>({
      result: 'fail'
    });
  });

  test('Input "*emphasis text*"', () => {
    const input = [...'*emphasis text*'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Emphasis>>({
      result: 'success',
      data: {
        type: 'emphasis',
        children: [
          {
            type: 'text',
            value: 'emphasis text'
          }
        ]
      },
      rest: []
    });
  });

  test('Input "   *emphasis with whitespace*   ', () => {
    const input = [...'   *emphasis with whitespace*   '] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Emphasis>>({
      result: 'success',
      data: {
        type: 'emphasis',
        children: [
          {
            type: 'text',
            value: 'emphasis with whitespace'
          }
        ]
      },
      rest: []
    });
  });
});
