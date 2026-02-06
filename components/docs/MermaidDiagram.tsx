"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
        });

        // Try to render
        const id = `mermaid-${Date.now()}`;
        const result = await mermaid.render(id, chart);
        
        if (!cancelled) {
          setSvg(result.svg);
        }
      } catch (err) {
        console.error("Mermaid error:", err);
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Render failed");
        }
      }
    };

    render();
    return () => { cancelled = true; };
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 p-4">
        <p className="text-sm text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-6 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-12">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
        <span className="ml-2 text-sm text-zinc-500">Rendering diagram...</span>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4">
      <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}
