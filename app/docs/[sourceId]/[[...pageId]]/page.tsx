import { fetchDocsManifest } from "@/lib/docs/fetchDocsManifest";
import { resolveDocsPage, resolveDocsSource } from "@/lib/docs/resolve";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    sourceId: string;
    pageId?: string[];
  }>;
}

export default async function DocsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { sourceId, pageId } = resolvedParams;

  console.log("Docs Params:", { sourceId, pageId });

  const source = resolveDocsSource(sourceId);
  if (!source) {
    notFound();
  }

  const manifest = await fetchDocsManifest(source);
  const pageIdString = pageId?.join("/");
  const page = resolveDocsPage(manifest, pageIdString);

  return <pre>{JSON.stringify({ source, page }, null, 2)}</pre>;
}
