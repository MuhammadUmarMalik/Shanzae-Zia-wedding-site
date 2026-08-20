import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const key = path.join("/");
  const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
  const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!key || !forgeBaseUrl || !forgeKey) {
    return new Response("Storage proxy not configured", { status: 500 });
  }

  try {
    const forgeUrl = new URL("v1/storage/presign/get", `${forgeBaseUrl}/`);
    forgeUrl.searchParams.set("path", key);
    const response = await fetch(forgeUrl, { headers: { Authorization: `Bearer ${forgeKey}` } });

    if (!response.ok) {
      return new Response("Storage backend error", { status: 502 });
    }

    const payload = (await response.json()) as { url?: string };
    if (!payload.url) {
      return new Response("Storage backend returned an empty URL", { status: 502 });
    }

    return new Response(null, {
      status: 307,
      headers: {
        Location: payload.url,
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch {
    return new Response("Storage proxy error", { status: 502 });
  }
}
