import { DocsSource } from "./registry";

export async function fetchDocsRawFile(
  source: DocsSource,
  relativePath: string
): Promise<string> {
  const url = `https://raw.githubusercontent.com/${source.owner}/${source.repo}/${source.branch}/${source.docsPath}/${relativePath}`;

  const res = await fetch(url, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch documentation file: ${url} (${res.status})`
    );
  }

  return await res.text();
}
