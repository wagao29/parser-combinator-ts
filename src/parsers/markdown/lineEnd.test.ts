import type { ParserOutput } from '../../types';
import type { LineEnd } from './lineEnd';
import { lineEnd } from './lineEnd';

describe('lineEnd', () => {
  const parser = lineEnd;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<LineEnd>>({
      result: 'fail'
    });
  });

  test('Input "\r"', () => {
    const input = [...'\r'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<LineEnd>>({
      result: 'success',
      data: '\r',
      rest: []
    });
  });

  test('Input "\n"', () => {
    const input = [...'\n'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<LineEnd>>({
      result: 'success',
      data: '\n',
      rest: []
    });
  });
});
