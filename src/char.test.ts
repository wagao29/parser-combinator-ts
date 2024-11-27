import { char } from './char';
import type { ParserOutput } from './types';

describe('char("a")', () => {
  const parser = char('a');

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'a'>>({
      result: 'fail'
    });
  });

  test('Input "a"', () => {
    const input = [...'a'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'a'>>({
      result: 'success',
      data: 'a',
      rest: []
    });
  });

  test('Input "A"', () => {
    const input = [...'A'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'a'>>({
      result: 'fail'
    });
  });

  test('Input "hoge"', () => {
    const input = [...'hoge'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<'a'>>({
      result: 'fail'
    });
  });
});
