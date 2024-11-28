import { digit } from './char';
import type { ParserOutput } from './types';
import { map, str } from './util';

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

describe('str("true")', () => {
  const parser = str('true');

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'true'>>({
      result: 'fail'
    });
  });

  test('Input "true"', () => {
    const input = [...'true'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'true'>>({
      result: 'success',
      data: 'true',
      rest: []
    });
  });
});
