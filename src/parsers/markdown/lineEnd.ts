import { char } from '../../char';
import { or } from '../../combinators';
import type { Parser } from '../../types';

export type LineEnd = '\r' | '\n';

export const lineEnd: Parser<LineEnd> = or([char('\r'), char('\n')]);
