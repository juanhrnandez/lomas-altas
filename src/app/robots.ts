import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

// Required by output: "export" — the file is written once at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next internals are not content; the image optimizer never serves a page.
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
