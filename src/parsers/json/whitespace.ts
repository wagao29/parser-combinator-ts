import { char } from '../../char';
import { or, rep } from '../../combinators';
import type { Parser } from '../../types';
import { map } from '../../util';

export const whitespace: Parser<null> = map(
  rep(or([...'\t\n\r '].map(char))),
  () => null
);
