import type { Root } from 'mdast';

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
    const md = `# Heading 1

\`inline code\`

**emphasis text**

*strong text*`;
    const input = [...md] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Root>>({
      result: 'success',
      data: {
        type: 'root',
        children: [
          {
            type: 'heading',
            depth: 1,
            children: [
              {
                type: 'text',
                value: 'Heading 1'
              }
            ]
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'inlineCode',
                value: 'inline code'
              }
            ]
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'strong',
                children: [
                  {
                    type: 'text',
                    value: 'emphasis text'
                  }
                ]
              }
            ]
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'emphasis',
                children: [
                  {
                    type: 'text',
                    value: 'strong text'
                  }
                ]
              }
            ]
          }
        ]
      },
      rest: []
    });
  });
});
