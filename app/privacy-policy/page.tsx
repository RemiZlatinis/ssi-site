import { docsRegistry } from "@/lib/docs/registry";
import { fetchDocsRawFile } from "@/lib/docs/fetchDocsRawFile";
import { MarkdownRenderer } from "@/components/docs/MarkdownRenderer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SSI",
  description: "SSIs Privacy Policy. Learn how we handle your data.",
};

export default async function PrivacyPolicyPage() {
  const source = docsRegistry.find((s) => s.id === "legal");
  if (!source) notFound();

  let content = "";
  try {
    content = await fetchDocsRawFile(source, "Privacy Policy.md");
  } catch (error) {
    console.error("Failed to fetch Privacy Policy:", error);
    notFound();
  }

  return (
    <div className="container mx-auto py-16 px-4 md:px-8 max-w-4xl">
      <div className="max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
