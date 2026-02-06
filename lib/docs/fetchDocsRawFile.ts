import { DocsSource } from "./registry";
import path from "path";
import fs from "fs/promises";

export async function fetchDocsRawFile(
  source: DocsSource,
  relativePath: string,
): Promise<string> {
  // Check if we should use local docs
  // Only in development and if explicitly enabled
  if (
    process.env.NODE_ENV === "development" &&
    process.env.USE_LOCAL_DOCS === "true"
  ) {
    try {
      // Assuming the repo is a sibling of the current project directory
      // process.cwd() in Next.js is usually the project root
      const localPath = path.resolve(
        process.cwd(),
        "..",
        source.repo,
        source.docsPath,
        relativePath,
      );

      console.log(`[LocalDocs] Fetching ${relativePath} from ${localPath}`);

      const content = await fs.readFile(localPath, "utf-8");
      return content;
    } catch (e) {
      console.warn(`[LocalDocs] Failed to read ${relativePath} locally`, e);
      // Fallback to remote fetch
    }
  }

  const pathParts = [source.docsPath, relativePath].filter(Boolean).join("/");
  const url = `https://raw.githubusercontent.com/${source.owner}/${source.repo}/${source.branch}/${pathParts}`;

  const res = await fetch(url, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch documentation file: ${url} (${res.status})`,
    );
  }

  return await res.text();
}
