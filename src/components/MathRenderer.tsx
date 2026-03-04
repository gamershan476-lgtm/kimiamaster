import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  math: string;
  block?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ math, block = false }) => {
  try {
    if (block) {
      return <BlockMath math={math} />;
    }
    return <InlineMath math={math} />;
  } catch (error) {
    console.error('Math rendering error:', error);
    return <span>{math}</span>;
  }
};

// Helper for markdown with math
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export const ChemistryMarkdown: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert prose-p:leading-relaxed prose-p:mb-6 prose-headings:mb-4 prose-headings:mt-8 first:prose-headings:mt-0">
      <Markdown 
        remarkPlugins={[remarkMath]} 
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </Markdown>
    </div>
  );
};
