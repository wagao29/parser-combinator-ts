import type { Root } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import fs from 'node:fs';
import { visit } from 'unist-util-visit';
import { markdown } from '.';
import type { ParserOutput } from '../../types';

describe('markdown', () => {
  const parser = markdown;

  test('Empty input', () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Root>>({
      result: 'success',
      data: {
        type: 'root',
        children: []
      },
      rest: []
    });
  });

  test('Input multiline markdown', () => {
    const md = fs.readFileSync('fixtures/test.md', 'utf-8');
    const tree = fromMarkdown(md);
    visit(tree, (node) => delete node.position);

    const input = [...md] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Root>>({
      result: 'success',
      data: tree,
      rest: []
    });
  });
});
