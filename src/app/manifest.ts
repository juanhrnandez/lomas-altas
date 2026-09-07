import type { MetadataRoute } from "next";

// Required by output: "export" — the file is written once at build time.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lomas Altas — Departamentos en Lomas Verdes, Naucalpan",
    short_name: "Lomas Altas",
    description:
      "Torre residencial boutique dentro de Terralago, Lomas Verdes, Naucalpan. Departamentos y penthouses a minutos de Satélite y Atizapán de Zaragoza.",
    lang: "es-MX",
    start_url: "/",
    display: "standalone",
    background_color: "#fcf6f0",
    theme_color: "#153124",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
