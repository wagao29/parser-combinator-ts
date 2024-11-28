import { digit } from './char';
import type { ParserOutput } from './types';
import { map } from './util';

describe('map(digit, s => Number.parseInt(s, 10))', () => {
  const parser = map(digit, (s) => Number.parseInt(s, 10));

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'fail'
    });
  });

  test('Input "5"', () => {
    const input = [...'5'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<number>>({
      result: 'success',
      data: 5,
      rest: []
    });
  });
});
