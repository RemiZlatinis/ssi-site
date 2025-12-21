import { DocsSource } from "./registry";
import { DocsManifest } from "./manifest";
import { fetchSourceFile } from "./fetchSourceFile";

export async function fetchDocsManifest(
  source: DocsSource
): Promise<DocsManifest> {
  const raw = await fetchSourceFile(source, "manifest.json");

  return JSON.parse(raw) as DocsManifest;
}
