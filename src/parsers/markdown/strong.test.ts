import type { Strong } from 'mdast';
import type { ParserOutput } from '../../types';
import { strong } from './strong';

describe('strong', () => {
  const parser = strong;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Strong>>({
      result: 'fail'
    });
  });

  test('Input "*strong text*"', () => {
    const input = [...'*strong text*'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Strong>>({
      result: 'fail'
    });
  });

  test('Input "***strong text***"', () => {
    const input = [...'***strong text***'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Strong>>({
      result: 'fail'
    });
  });

  test('Input "**strong text**"', () => {
    const input = [...'**strong text**'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Strong>>({
      result: 'success',
      data: {
        type: 'strong',
        children: [
          {
            type: 'text',
            value: 'strong text'
          }
        ]
      },
      rest: []
    });
  });
});
