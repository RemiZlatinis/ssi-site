"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { MermaidDiagram } from "./MermaidDiagram";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

import { DocsManifest } from "@/lib/docs/manifest";
import Link from "next/link";

interface MarkdownRendererProps {
  content: string;
  sourceId?: string;
  manifest?: DocsManifest;
}

// Regex to detect GitHub-style callouts: > [!TYPE]
const calloutRegex = /^>\s*\[!(NOTE|WARNING|TIP|CAUTION|IMPORTANT)\]\s*(.*)$/im;

// Check if content is a mermaid diagram
const isMermaid = (content: string) => {
  const trimmed = content.trim();
  return (
    trimmed.startsWith("graph ") ||
    trimmed.startsWith("flowchart ") ||
    trimmed.startsWith("sequenceDiagram") ||
    trimmed.startsWith("classDiagram") ||
    trimmed.startsWith("stateDiagram") ||
    trimmed.startsWith("erDiagram") ||
    trimmed.startsWith("journey") ||
    trimmed.startsWith("gantt") ||
    trimmed.startsWith("pie") ||
    trimmed.startsWith("gitGraph")
  );
};

export function MarkdownRenderer({
  content,
  sourceId,
  manifest,
}: MarkdownRendererProps) {
  // Process content to extract callouts before markdown parsing
  const processedContent = content.replace(
    /^>\s*\[!(NOTE|WARNING|TIP|CAUTION|IMPORTANT)\]\s*(.*)$/gim,
    (match, type, title) => {
      return `:::${type.toLowerCase()}${title ? ` ${title}` : ""}\n:::`;
    },
  );

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Headings
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-4">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-6 mb-3">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-3">
            {children}
          </h4>
        ),

        // Paragraphs and text
        p: ({ children }) => (
          <p className="text-zinc-700 dark:text-zinc-300 leading-7 mb-4 wrap-pre">
            {children}
          </p>
        ),

        // Links
        a: ({ href, children }) => {
          if (!href) return <span>{children}</span>;

          const isExternal =
            href.startsWith("http") || href.startsWith("mailto:");

          // Resolve internal documentation links
          if (!isExternal && href.endsWith(".md") && sourceId && manifest) {
            const targetFile = href.replace(/^(\.\/)/, ""); // Remove leading ./

            let foundPageId: string | null = null;

            for (const section of manifest.sections) {
              const page = section.pages.find((p) => p.file === targetFile);
              if (page) {
                foundPageId = page.id;
                break;
              }
            }

            if (foundPageId) {
              return (
                <Link
                  href={`/docs/${sourceId}/${foundPageId}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {children}
                </Link>
              );
            }
          }

          return (
            <a
              href={href}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
            >
              {children}
            </a>
          );
        },

        // Lists
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300 mb-4 ml-4">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 text-zinc-700 dark:text-zinc-300 mb-4 ml-4">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-7">{children}</li>,

        // Code blocks
        code: ({ children, className }) => {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";
          const code = String(children).replace(/\n$/, "");

          // Check if it's a mermaid diagram
          if (language === "mermaid" || isMermaid(code)) {
            return <MermaidDiagram chart={code} />;
          }

          if (className) {
            // This is a code block
            return (
              <CodeBlock
                code={code}
                language={language}
                showLineNumbers={true}
              />
            );
          }

          // This is inline code
          return (
            <code className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-sm font-mono text-zinc-800 dark:text-zinc-200">
              {children}
            </code>
          );
        },
        pre: ({ children }) => {
          // Let the code component handle this
          return <>{children}</>;
        },

        // Tables
        table: ({ children }) => <Table>{children}</Table>,
        thead: ({ children }) => <TableHeader>{children}</TableHeader>,
        tbody: ({ children }) => <TableBody>{children}</TableBody>,
        tr: ({ children }) => <TableRow>{children}</TableRow>,
        th: ({ children }) => <TableHead>{children}</TableHead>,
        td: ({ children }) => <TableCell>{children}</TableCell>,

        // Blockquotes (for callouts)
        blockquote: ({ children }) => {
          // Check if this is a callout by looking at the content
          const content = String(children);
          const calloutMatch = content.match(calloutRegex);

          if (calloutMatch) {
            const type = calloutMatch[1].toLowerCase() as
              | "note"
              | "warning"
              | "tip"
              | "caution"
              | "important";
            const title = calloutMatch[2] || undefined;

            // Extract the actual content (remove the callout marker)
            const actualContent = content.replace(calloutRegex, "").trim();

            return (
              <Callout type={type} title={title}>
                {actualContent}
              </Callout>
            );
          }

          // Regular blockquote
          return (
            <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 my-6 text-zinc-600 dark:text-zinc-400 italic">
              {children}
            </blockquote>
          );
        },

        // Horizontal rule
        hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,

        // Strong and emphasis
        strong: ({ children }) => (
          <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-zinc-700 dark:text-zinc-300">
            {children}
          </em>
        ),

        // Images
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 my-6"
          />
        ),
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
