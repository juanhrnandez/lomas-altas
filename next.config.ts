import type { NextConfig } from "next";

/**
 * Static export. `npm run build` writes a self-contained site to ./dist that
 * any HTML server can host: no Node, no image optimizer, no rewrites.
 *
 * - trailingSlash: every route becomes <ruta>/index.html, so /espacios/ works
 *   on Nginx, Apache, S3, GitHub Pages… without "clean URL" rules. The
 *   canonical/sitemap URLs in src/lib/seo.ts carry the same slash.
 * - images.unoptimized: mandatory for export (there is no /_next/image server).
 *   The source files are already the delivery size.
 *
 * Set NEXT_PUBLIC_SITE_URL to the final https://domain before building, or the
 * canonical, sitemap and JSON-LD URLs come out pointing at localhost.
 */
const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  trailingSlash: true,
  images: {
    unoptimized: true,
    qualities: [75, 80, 90, 100],
  },
  async rewrites() {
    return [
      {
        source: "/images/Amenidades/:path*",
        destination: "/images/amenidades/:path*",
      },
      {
        source: "/images/Generales/:path*",
        destination: "/images/generales/:path*",
      },
    ];
  },
};

export default nextConfig;
