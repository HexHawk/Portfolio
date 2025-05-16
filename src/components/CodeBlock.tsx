
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  highlightLines = [],
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  // Remove trailing newlines to prevent extra empty lines
  const trimmedCode = code.replace(/\n+$/, '');

  const customStyle = {
    borderRadius: '0.5rem',
    padding: '1rem 0',
    margin: '1.5rem 0',
    background: '#1A1F2C',
    fontSize: '0.9rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  };

  const lineNumberStyle = {
    minWidth: '3em',
    paddingRight: '1em',
    textAlign: 'right' as const,
    color: '#8E9196',
    userSelect: 'none' as const,
    borderRight: '1px solid #444',
    marginRight: '1em',
  };

  return (
    <div className="code-block-wrapper group relative overflow-auto">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors text-white opacity-0 group-hover:opacity-100"
        aria-label="Copy code"
        title="Copy code"
      >
          {copied ? (
            <i className="fas fa-check text-green-400 text-base"></i>
          ) : (
            <i className="fas fa-copy text-gray-300 text-base"></i>
          )}
      </button>

      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={customStyle}
        showLineNumbers={showLineNumbers}
        lineNumberStyle={lineNumberStyle}
        wrapLines={true}
        lineProps={(lineNumber) => {
          const style: React.CSSProperties = { display: 'block' };
          if (highlightLines.includes(lineNumber)) {
            style.backgroundColor = 'rgba(155, 135, 245, 0.2)';
            style.borderLeft = '3px solid #9b87f5';
          }
          return { style };
        }}
      >
        {trimmedCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
