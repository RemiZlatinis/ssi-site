import { fetchDocsManifest } from "@/lib/docs/fetchDocsManifest";
import { resolveDocsPage, resolveDocsSource } from "@/lib/docs/resolve";
import { fetchDocsRawFile } from "@/lib/docs/fetchDocsRawFile";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/docs/MarkdownRenderer";

interface PageProps {
  params: Promise<{
    sourceId: string;
    pageId?: string[];
  }>;
}

export default async function DocsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { sourceId, pageId } = resolvedParams;

  const source = resolveDocsSource(sourceId);
  if (!source) {
    notFound();
  }

  const manifest = await fetchDocsManifest(source);
  const pageIdString = pageId?.join("/");
  const page = resolveDocsPage(manifest, pageIdString);

  if (!page) {
    notFound();
  }

  const content = await fetchDocsRawFile(source, page.file);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-none">
        <MarkdownRenderer
          content={content}
          sourceId={sourceId}
          manifest={manifest}
        />
      </div>
    </div>
  );
}
