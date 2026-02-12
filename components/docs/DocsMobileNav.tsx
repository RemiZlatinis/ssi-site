"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, BookOpen } from "lucide-react";
import { DocsManifest } from "@/lib/docs/manifest";
import { DocsSource } from "@/lib/docs/registry";
import { clsx } from "clsx";

interface DocsMobileNavProps {
  sources: DocsSource[];
  currentSourceId: string;
  manifest: DocsManifest | null;
}

export function DocsMobileNav({
  sources,
  currentSourceId,
  manifest,
}: DocsMobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentSource = sources.find((s) => s.id === currentSourceId);

  // Find current page title for display
  let currentPageTitle = "Documentation";
  if (manifest) {
    for (const section of manifest.sections) {
      for (const page of section.pages) {
        // Build the href for this page
        const pageHref = `/docs/${currentSourceId}/${page.id === "index" ? "" : page.id}`;
        const rootPath = `/docs/${currentSourceId}`;
        
        // Check if this is the current page
        // Index page matches root path, other pages match their specific path
        if (
          (page.id === "index" && pathname === rootPath) ||
          (page.id !== "index" && pathname === pageHref)
        ) {
          currentPageTitle = page.title;
          break;
        }
      }
    }
  }

  return (
    <>
      {/* Mobile Nav Trigger - Sticky Header */}
      <div className="md:hidden sticky top-14 z-20 -mx-4 px-4 py-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 w-full text-left"
        >
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <BookOpen className="h-4 w-4" />
            <span>Contents</span>
          </div>
          <ChevronRight className="h-4 w-4 text-zinc-400" />
          <span className="text-sm font-medium truncate">
            {currentSource?.title} / {currentPageTitle}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 md:hidden max-h-[85vh]"
            >
              <div className="bg-white dark:bg-zinc-900 rounded-t-2xl shadow-2xl border-t border-zinc-200 dark:border-zinc-800 flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
                  <span className="font-bold text-lg">Documentation</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Source Switcher Tabs */}
                <div className="flex gap-1 p-2 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto shrink-0">
                  {sources.map((source) => (
                    <Link
                      key={source.id}
                      href={`/docs/${source.id}`}
                      onClick={() => setIsOpen(false)}
                      className={clsx(
                        "px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                        source.id === currentSourceId
                          ? "bg-foreground text-background"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      )}
                    >
                      {source.title}
                    </Link>
                  ))}
                </div>

                {/* Navigation Content */}
                <div className="overflow-y-auto p-4">
                  {manifest ? (
                    <div className="flex flex-col gap-6">
                      {manifest.sections.map((section, sectionIndex) => (
                        <motion.div
                          key={section.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: sectionIndex * 0.05 }}
                          className="flex flex-col gap-2"
                        >
                          <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                            {section.title}
                          </h4>
                          <div className="flex flex-col gap-1 border-l-2 border-zinc-200 dark:border-zinc-700 pl-3">
                            {section.pages.map((page, pageIndex) => {
                              const pageHref = `/docs/${currentSourceId}/${page.id === "index" ? "" : page.id}`;
                              const isActive =
                                (page.id === "index" && pathname === `/docs/${currentSourceId}`) ||
                                (page.id !== "index" && pathname === pageHref);

                              return (
                                <motion.div
                                  key={page.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: sectionIndex * 0.05 + pageIndex * 0.03,
                                  }}
                                >
                                  <Link
                                    href={pageHref}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                      "block py-1.5 text-sm transition-colors",
                                      isActive
                                        ? "text-foreground font-medium"
                                        : "text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                                    )}
                                  >
                                    {page.title}
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-zinc-500">
                      <p>No documentation available</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 shrink-0">
                  <p className="text-xs text-center text-zinc-500">
                    SSI Documentation
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
