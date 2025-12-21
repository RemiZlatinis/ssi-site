/**
 * Resolution steps:
 * 1. Look up sourceId in docsRegistry
 *  - If not found or disabled → 404
 * 2. Load manifest for that source
 * 3. If pageId is missing:
 *  - Resolve to page.id === "index"
 * 4. If pageId is present:
 *  - Find matching page.id
 *  - Section is irrelevant here
 * 5. If no page matches → 404
 */

import { DocsManifest, DocsPage } from "./manifest";
import { docsRegistry, DocsSource } from "./registry";

export function resolveDocsSource(sourceId: string): DocsSource | null {
  const source = docsRegistry.find((s) => s.id === sourceId);
  if (!source || !source.enabled) {
    return null;
  }
  return source;
}

export function resolveDocsPage(
  manifest: DocsManifest,
  pageId?: string
): DocsPage | null {
  const allPages = manifest.sections.flatMap((s) => s.pages);

  if (!pageId) {
    return allPages[0] || null;
  }

  return allPages.find((p) => p.id === pageId) || null;
}
