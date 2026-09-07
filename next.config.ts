import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
