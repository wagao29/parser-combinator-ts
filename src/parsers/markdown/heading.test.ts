import type { Heading } from 'mdast';

import type { ParserOutput } from '../../types';
import { heading } from './heading';

describe('heading', () => {
  const parser = heading;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail'
    });
  });

  test('Input "#Heading 1"', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail'
    });
  });

  test('Input "# Heading 1"', () => {
    const input = [...'# Heading 1'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Heading>>({
      result: 'success',
      data: {
        type: 'heading',
        depth: 1,
        children: [
          {
            type: 'text',
            value: 'Heading 1'
          }
        ]
      },
      rest: []
    });
  });

  test('Input "##   Heading 2"', () => {
    const input = [...'##   Heading 2'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Heading>>({
      result: 'success',
      data: {
        type: 'heading',
        depth: 2,
        children: [
          {
            type: 'text',
            value: 'Heading 2'
          }
        ]
      },
      rest: []
    });
  });

  test('Input "###### Heading 6"', () => {
    const input = [...'######  Heading 6'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Heading>>({
      result: 'success',
      data: {
        type: 'heading',
        depth: 6,
        children: [
          {
            type: 'text',
            value: 'Heading 6'
          }
        ]
      },
      rest: []
    });
  });

  test('Input "####### Nonexistent Heading"', () => {
    const input = [...'#######  Nonexistent Heading'] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Heading>>({
      result: 'fail'
    });
  });
});
