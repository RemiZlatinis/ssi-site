"use client";

import { useState } from "react";
import { Check, Copy, ChevronRight, Cpu } from "lucide-react";

interface CodeSide {
  filename: string;
  language: string;
  code: string;
  html: string;
  iconName: string;
  iconColor: string;
  label: string;
}

interface Connection {
  id: string;
  title: string;
  description: string;
  connectionLabel: string;
  source: CodeSide;
  destination: CodeSide;
}

interface UnderTheHoodClientProps {
  connections: Connection[];
}

const iconComponents: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  FileText: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Terminal: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  Server: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Radio: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </svg>
  ),
  Smartphone: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
};

export function UnderTheHoodClient({ connections }: UnderTheHoodClientProps) {
  const [activeConnection, setActiveConnection] = useState(connections[0]);
  const [copiedSide, setCopiedSide] = useState<"source" | "destination" | null>(
    null,
  );

  const handleCopy = async (side: "source" | "destination", code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedSide(side);
    setTimeout(() => setCopiedSide(null), 2000);
  };

  const getIcon = (iconName: string, colorClass: string) => {
    const IconComponent = iconComponents[iconName];
    if (IconComponent) {
      return <IconComponent className={`h-4 w-4 ${colorClass}`} />;
    }
    return null;
  };

  return (
    <section className="w-full py-24 bg-black text-white">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="animate-fade-up reveal-view">
            <div className="inline-flex items-center rounded-lg bg-zinc-800 px-3 py-1 text-sm font-medium mb-4 border border-zinc-700">
              <Cpu className="mr-2 h-4 w-4" /> Data Flow
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Under the Hood
            </h2>
            <p className="text-zinc-400 max-w-[700px] mx-auto text-lg">
              See how data flows through the entire SSI system, from your
              service scripts all the way to your mobile app.
            </p>
          </div>
        </div>

        {/* Connection Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {connections.map((connection, index) => (
            <button
              key={connection.id}
              onClick={() => setActiveConnection(connection)}
              className={`min-w-56 md:min-w-auto px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeConnection.id === connection.id
                  ? "bg-zinc-800 text-white border border-zinc-700"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-700 text-xs">
                {index + 1}
              </span>
              {connection.title}
            </button>
          ))}
        </div>

        {/* Connection Description */}
        <div
          key={activeConnection.id}
          className="animate-fade-up text-center mb-8"
        >
          <p className="text-zinc-400">{activeConnection.description}</p>
        </div>

        {/* Code Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Source Side */}
            <div
              key={`source-${activeConnection.id}`}
              className="animate-fade-left rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-2">
                  {getIcon(
                    activeConnection.source.iconName,
                    activeConnection.source.iconColor,
                  )}
                  <span className="text-sm font-medium text-zinc-300">
                    {activeConnection.source.label}
                  </span>
                  <span className="text-xs text-zinc-400">
                    ({activeConnection.source.filename})
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleCopy("source", activeConnection.source.code)
                  }
                  aria-label={
                    copiedSide === "source"
                      ? "Copied"
                      : "Copy source code to clipboard"
                  }
                  className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  {copiedSide === "source" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Code */}
              <div
                className="overflow-x-auto code-highlighted show-line-numbers"
                style={
                  {
                    "--line-number-color": "#a1a1aa",
                    "--code-font-size": "0.75rem",
                    "--code-line-height": "1.25rem",
                  } as React.CSSProperties
                }
                dangerouslySetInnerHTML={{
                  __html: activeConnection.source.html,
                }}
              />
            </div>

            {/* Destination Side */}
            <div
              key={`destination-${activeConnection.id}`}
              className="animate-fade-right rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-2">
                  {getIcon(
                    activeConnection.destination.iconName,
                    activeConnection.destination.iconColor,
                  )}
                  <span className="text-sm font-medium text-zinc-300">
                    {activeConnection.destination.label}
                  </span>
                  <span className="text-xs text-zinc-400">
                    ({activeConnection.destination.filename})
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleCopy("destination", activeConnection.destination.code)
                  }
                  aria-label={
                    copiedSide === "destination"
                      ? "Copied"
                      : "Copy destination code to clipboard"
                  }
                  className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  {copiedSide === "destination" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Code */}
              <div
                className="overflow-x-auto code-highlighted show-line-numbers"
                style={
                  {
                    "--line-number-color": "#a1a1aa",
                    "--code-font-size": "0.75rem",
                    "--code-line-height": "1.25rem",
                  } as React.CSSProperties
                }
                dangerouslySetInnerHTML={{
                  __html: activeConnection.destination.html,
                }}
              />
            </div>
        </div>

        {/* Connection Arrow (Desktop only) */}
        <div className="hidden lg:flex justify-center -my-2 relative z-10">
          <div
            className="animate-fade-scale reveal-view flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-300"
          >
            <span>{activeConnection.connectionLabel}</span>
            <span className="animate-nudge-x inline-flex">
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
