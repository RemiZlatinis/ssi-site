"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ChevronRight, Cpu } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Custom theme with gray comments instead of green
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

interface Connection {
  id: string;
  title: string;
  description: string;
  connectionLabel: string;
  source: {
    filename: string;
    language: string;
    code: string;
    iconName: string;
    iconColor: string;
    label: string;
  };
  destination: {
    filename: string;
    language: string;
    code: string;
    iconName: string;
    iconColor: string;
    label: string;
  };
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
      <div className="container px-4 md:px-8 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
        </div>

        {/* Connection Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {connections.map((connection, index) => (
            <motion.button
              key={connection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
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
            </motion.button>
          ))}
        </div>

        {/* Connection Description */}
        <motion.div
          key={activeConnection.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <p className="text-zinc-400">{activeConnection.description}</p>
        </motion.div>

        {/* Code Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence mode="wait">
            {/* Source Side */}
            <motion.div
              key={`source-${activeConnection.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50"
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
                  <span className="text-xs text-zinc-500">
                    ({activeConnection.source.filename})
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleCopy("source", activeConnection.source.code)
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
              <div className="overflow-x-auto">
                <SyntaxHighlighter
                  language={activeConnection.source.language}
                  style={customTheme}
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    background: "transparent",
                    fontSize: "0.75rem",
                    lineHeight: "1.25rem",
                  }}
                  showLineNumbers
                  lineNumberStyle={{
                    color: "#52525b",
                    paddingRight: "1rem",
                    minWidth: "2rem",
                  }}
                >
                  {activeConnection.source.code}
                </SyntaxHighlighter>
              </div>
            </motion.div>

            {/* Destination Side */}
            <motion.div
              key={`destination-${activeConnection.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50"
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
                  <span className="text-xs text-zinc-500">
                    ({activeConnection.destination.filename})
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleCopy("destination", activeConnection.destination.code)
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
              <div className="overflow-x-auto">
                <SyntaxHighlighter
                  language={activeConnection.destination.language}
                  style={customTheme}
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    background: "transparent",
                    fontSize: "0.75rem",
                    lineHeight: "1.25rem",
                  }}
                  showLineNumbers
                  lineNumberStyle={{
                    color: "#52525b",
                    paddingRight: "1rem",
                    minWidth: "2rem",
                  }}
                >
                  {activeConnection.destination.code}
                </SyntaxHighlighter>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Connection Arrow (Desktop only) */}
        <div className="hidden lg:flex justify-center -my-2 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-300"
          >
            <span>{activeConnection.connectionLabel}</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
