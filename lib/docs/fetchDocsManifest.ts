import { DocsSource } from "./registry";
import { DocsManifest } from "./manifest";
import { fetchDocsRawFile } from "./fetchDocsRawFile";

export async function fetchDocsManifest(
  source: DocsSource,
): Promise<DocsManifest> {
  try {
    const raw = await fetchDocsRawFile(source, "manifest.json");
    return JSON.parse(raw) as DocsManifest;
  } catch (error) {
    console.warn(
      `Failed to fetch manifest for ${source.id}, using fallback.`,
      error,
    );
    // Return a structured empty manifest to allow build to succeed
    return {
      version: 1,
      title: source.title,
      sections: [],
    };
  }
}
