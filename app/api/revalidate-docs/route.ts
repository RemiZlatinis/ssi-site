import { createHmac, timingSafeEqual } from "crypto";

import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { docsRegistry } from "@/lib/docs/registry";

/**
 * On-demand invalidation endpoint for the documentation Data Cache.
 *
 * GitHub push webhooks on documentation source repositories POST here;
 * the matching source's cached docs entries are purged via revalidateTag,
 * so the next request regenerates pages with fresh content from `main`.
 *
 * Webhook configuration per source repository:
 *   - Payload URL: https://<site-domain>/api/revalidate-docs
 *   - Content type: application/json
 *   - Secret: same value as the DOCS_REVALIDATE_SECRET environment variable
 *   - Events: Push only
 */
export async function POST(request: NextRequest) {
  const secret = process.env.DOCS_REVALIDATE_SECRET;
  if (!secret) {
    return new NextResponse("Endpoint not configured", { status: 503 });
  }

  const payload = await request.text();

  // Verify the GitHub webhook signature (HMAC-SHA256 of the raw body)
  const signature = request.headers.get("x-hub-signature-256") ?? "";
  const expected =
    "sha256=" + createHmac("sha256", secret).update(payload).digest("hex");
  const signatureValid =
    signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

  if (!signatureValid) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(payload);
  const full_name: string | undefined = event?.repository?.full_name;
  const pushedBranch: string | undefined = event?.ref?.replace(
    "refs/heads/",
    "",
  );

  if (!full_name) {
    return new NextResponse("Ignored: no repository in payload", {
      status: 200,
    });
  }

  const source = docsRegistry.find(
    (s) => s.enabled && `${s.owner}/${s.repo}` === full_name,
  );

  if (!source) {
    return new NextResponse(`Ignored: ${full_name} is not a docs source`, {
      status: 200,
    });
  }

  if (pushedBranch !== source.branch) {
    return new NextResponse(
      `Ignored: push to ${pushedBranch}, docs fetch from ${source.branch}`,
      { status: 200 },
    );
  }

  revalidateTag(`docs:${source.id}`, "max");

  return NextResponse.json({
    revalidated: true,
    source: source.id,
    tag: `docs:${source.id}`,
  });
}
