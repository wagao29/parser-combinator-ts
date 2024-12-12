import type {
  Paragraph,
  PhrasingContent,
  Root,
  Text,
  TopLevelContent
} from 'mdast';
import { char } from '../../char';
import { cat, or, rep } from '../../combinators';
import { anyChar } from '../../primitives';
import type { Parser } from '../../types';
import { diff, list, map, opt } from '../../util';
import { emphasis } from './emphasis';
import { heading } from './heading';
import { inlineCode } from './inlineCode';
import { lineEnd } from './lineEnd';
import { strong } from './strong';

const text: Parser<Text> = map(
  cat([rep(char(' ')), rep(diff(anyChar, lineEnd), 1)]),
  ([, v]) => {
    const text: Text = {
      type: 'text',
      value: v.join('').trim()
    };
    return text;
  }
);

const paragraph: Parser<Paragraph> = map(
  rep(or<PhrasingContent>([inlineCode, emphasis, strong, text]), 1),
  (v) => {
    const paragraph: Paragraph = {
      type: 'paragraph',
      children: v
    };
    return paragraph;
  }
);

const topLevelContent: Parser<TopLevelContent> = or<TopLevelContent>([
  heading,
  paragraph
]);

export const markdown: Parser<Root> = map(
  opt(list(topLevelContent, rep(lineEnd))),
  (v) => {
    const root: Root = {
      type: 'root',
      children: v.status === 'some' ? v.value : []
    };
    return root;
  }
);
