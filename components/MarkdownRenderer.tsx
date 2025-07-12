'use client';

import Markdown from 'markdown-to-jsx';

type Props = {
  content: string;
  className?: string;
};

export default function MarkdownRenderer({ content, className = '' }: Props) {
  return (
    <div className={`prose prose-sm max-w-none dark:prose-invert ${className}`}>
      <Markdown>{content}</Markdown>
    </div>
  );
}
