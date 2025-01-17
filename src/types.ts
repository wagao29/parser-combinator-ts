export type ParserInput = readonly string[];
export type ParserOutput<T> = Readonly<ParseSuccess<T> | ParseFail>;
export type Parser<T> = (input: ParserInput) => ParserOutput<T>;
export type ParserData<P> = P extends Parser<infer T> ? T : never;

interface ParseSuccess<T> {
  result: 'success';
  data: T;
  rest: ParserInput;
}

interface ParseFail {
  result: 'fail';
}
