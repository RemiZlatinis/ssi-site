"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DocsManifest } from "@/lib/docs/manifest";
import { DocsSource } from "@/lib/docs/registry";
import { clsx } from "clsx";

interface SidebarProps {
  sources: DocsSource[];
  currentSourceId: string;
  manifest: DocsManifest | null;
}

export function Sidebar({ sources, currentSourceId, manifest }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <div className="h-full overflow-y-auto py-6 pl-8 pr-6 lg:py-8 border-r">
        <div className="flex flex-col gap-8">
          {/* Source Switcher */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-sm">Components</h4>
            <div className="flex flex-col gap-1">
              {sources.map((source) => (
                <Link
                  key={source.id}
                  href={`/docs/${source.id}`}
                  className={clsx(
                    "text-sm px-2 py-1 rounded-md transition-colors",
                    source.id === currentSourceId
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  )}
                >
                  {source.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Docs Navigation */}
          {manifest && (
            <div className="flex flex-col gap-6">
              {manifest.sections.map((section) => (
                <div key={section.id} className="flex flex-col gap-2">
                  <h4 className="font-medium text-sm text-foreground">
                    {section.title}
                  </h4>
                  <div className="flex flex-col gap-1 border-l pl-4">
                    {section.pages.map((page) => {
                      const pageHref = `/docs/${currentSourceId}/${page.id === "index" ? "" : page.id}`;
                      // Handle "index" or root pages normalizing the path check
                      const isActive =
                        (page.id === "index" && pathname === `/docs/${currentSourceId}`) ||
                        (page.id !== "index" && pathname === pageHref);

                      return (
                        <Link
                          key={page.id}
                          href={pageHref}
                          className={clsx(
                            "text-sm transition-colors",
                            isActive
                              ? "text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {page.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
