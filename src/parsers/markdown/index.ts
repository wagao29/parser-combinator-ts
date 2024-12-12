import type { Paragraph, PhrasingContent, Root, TopLevelContent } from 'mdast';
import { or, rep } from '../../combinators';
import type { Parser } from '../../types';
import { list, map, opt } from '../../util';
import { emphasis } from './emphasis';
import { heading } from './heading';
import { inlineCode } from './inlineCode';
import { lineEnd } from './lineEnd';
import { strong } from './strong';

const paragraph: Parser<Paragraph> = map(
  rep(or<PhrasingContent>([inlineCode, emphasis, strong]), 1),
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
