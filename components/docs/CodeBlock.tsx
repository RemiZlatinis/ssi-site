"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Custom theme with gray comments instead of green (consistent with homepage)
const customTheme = {
  ...vscDarkPlus,
  comment: {
    color: "#71717a", // zinc-500 gray
  },
  prolog: {
    color: "#71717a",
  },
  doctype: {
    color: "#71717a",
  },
  cdata: {
    color: "#71717a",
  },
};

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              {filename}
            </span>
          ) : language ? (
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase">
              {language}
            </span>
          ) : null}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="relative overflow-x-auto">
        <SyntaxHighlighter
          language={language || "text"}
          style={customTheme}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.5rem",
          }}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={{
            color: "#52525b",
            paddingRight: "1rem",
            minWidth: "2rem",
            textAlign: "right",
            userSelect: "none",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
