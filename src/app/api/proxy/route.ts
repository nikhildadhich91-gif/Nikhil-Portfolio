import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    let html = await response.text();

    // Inject base tag to rewrite relative paths to absolute paths targeting the original host
    const baseTag = `<base href="${targetUrl}" />`;
    if (html.includes("<head>")) {
      html = html.replace("<head>", `<head>${baseTag}`);
    } else if (html.includes("<HEAD>")) {
      html = html.replace("<HEAD>", `<HEAD>${baseTag}`);
    } else {
      html = baseTag + html;
    }

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        // Do not include X-Frame-Options or Content-Security-Policy to allow embedding
      },
    });
  } catch (error) {
    return new NextResponse(`Proxy error: ${error}`, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
export const revalidate = 0;
