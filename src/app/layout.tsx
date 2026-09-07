import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  DEVELOPER_NAME,
  KEYWORDS,
  SALA_DE_VENTAS,
  SITE_NAME,
  SITE_URL,
  siteGraph,
} from "@/lib/seo";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const TITULO_HOME = `${SITE_NAME} — Departamentos en Lomas Verdes, Naucalpan | Terralago`;
const DESCRIPCION_HOME =
  "Torre residencial boutique de 18 departamentos y penthouses en Terralago, Lomas Verdes, Naucalpan. A minutos de Satélite, Atizapán de Zaragoza y Presa Madín.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITULO_HOME,
    // Every route sets its own title; the brand rides at the end.
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPCION_HOME,
  applicationName: SITE_NAME,
  keywords: [...KEYWORDS, "departamentos", "penthouses", "torre residencial"],
  authors: [{ name: DEVELOPER_NAME, url: SITE_URL }],
  creator: DEVELOPER_NAME,
  publisher: DEVELOPER_NAME,
  category: "real estate",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: SITE_NAME,
    url: "/",
    title: TITULO_HOME,
    description:
      "Torre residencial dentro de Terralago, Lomas Verdes, Naucalpan. Departamentos amplios y penthouses a minutos de Satélite y Atizapán de Zaragoza.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lomas Altas — Torre residencial dentro de Terralago, Lomas Verdes, Naucalpan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO_HOME,
    description:
      "Torre residencial dentro de Terralago, Lomas Verdes, Naucalpan. Departamentos amplios y penthouses a minutos de Satélite y Atizapán de Zaragoza.",
    images: ["/twitter-image.jpg"],
  },
  // Legacy geo tags: still read by several local-search crawlers and directories.
  other: {
    "geo.region": "MX-MEX",
    "geo.placename": `${SALA_DE_VENTAS.colonia}, ${SALA_DE_VENTAS.municipio}`,
    "geo.position": `${SALA_DE_VENTAS.lat};${SALA_DE_VENTAS.lng}`,
    ICBM: `${SALA_DE_VENTAS.lat}, ${SALA_DE_VENTAS.lng}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Organization → WebSite → ApartmentComplex → RealEstateAgent, once per document. */}
        <JsonLd data={siteGraph()} />
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
