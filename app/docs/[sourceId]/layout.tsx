import { Sidebar } from "@/components/docs/Sidebar";
import { docsRegistry } from "@/lib/docs/registry";
import { fetchDocsManifest } from "@/lib/docs/fetchDocsManifest";
import { resolveDocsSource } from "@/lib/docs/resolve";

interface DocsLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    sourceId: string;
  }>;
}

export default async function DocsLayout({
  children,
  params,
}: DocsLayoutProps) {
  const { sourceId } = await params;
  const source = resolveDocsSource(sourceId);
  const manifest = source
    ? await fetchDocsManifest(source).catch(() => null)
    : null;

  return (
    <div className="container px-4 md:px-8 mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <Sidebar
        sources={docsRegistry
          .filter((s) => s.enabled)
          .sort((a, b) => a.order - b.order)}
        currentSourceId={sourceId}
        manifest={manifest}
      />
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">{children}</div>
      </main>
    </div>
  );
}
