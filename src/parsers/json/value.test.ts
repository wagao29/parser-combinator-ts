import type { ParserOutput } from '../../types';
import type { ValueType } from './value';
import { array, value } from './value';

describe('value', () => {
  const parser = value;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'fail'
    });
  });

  test('Input "hello"', () => {
    const input = [...'hello'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'fail'
    });
  });

  test('Input ""hello""', () => {
    const input = [...'"hello"'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: 'hello',
      rest: []
    });
  });

  test('Input "\t"hello"\t"', () => {
    const input = [...'\t"hello"\t'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: 'hello',
      rest: []
    });
  });

  test('Input "42"', () => {
    const input = [...'42'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: 42,
      rest: []
    });
  });

  test('Input "true"', () => {
    const input = [...'true'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: true,
      rest: []
    });
  });

  test('Input "false"', () => {
    const input = [...'false'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: false,
      rest: []
    });
  });

  test('Input "null"', () => {
    const input = [...'null'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: null,
      rest: []
    });
  });

  test('Input "[1, 2, 3]"', () => {
    const input = [...'[1, 2, 3]'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: [1, 2, 3],
      rest: []
    });
  });

  // TODO: Test object
});

describe('array', () => {
  const parser = array;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'fail'
    });
  });

  test('Input "hello"', () => {
    const input = [...'hello'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'fail'
    });
  });

  test('Input "[]"', () => {
    const input = [...'[]'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'success',
      data: [],
      rest: []
    });
  });

  test('Input "[1]"', () => {
    const input = [...'[1]'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'success',
      data: [1],
      rest: []
    });
  });

  test('Input "[1, "2", false, null]"', () => {
    const input = [...'[1, "2", false, null]'];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'success',
      data: [1, '2', false, null],
      rest: []
    });
  });
});
