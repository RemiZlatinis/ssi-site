import { DocsSource } from "./registry";
import { DocsManifest } from "./manifest";
import { fetchDocsRawFile } from "./fetchDocsRawFile";

export async function fetchDocsManifest(
  source: DocsSource
): Promise<DocsManifest> {
  const raw = await fetchDocsRawFile(source, "manifest.json");
  return JSON.parse(raw) as DocsManifest;
}
