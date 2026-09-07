import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TIPOLOGIAS, obtenerTipologiaPorSlug } from "@/components/espacios/espaciosData";
import TipologiaDetalle from "@/components/espacios/TipologiaDetalle";
import JsonLd from "@/components/JsonLd";
import { OG_BASE, apartmentFor, breadcrumbList } from "@/lib/seo";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TIPOLOGIAS.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tipologia = obtenerTipologiaPorSlug(slug);

  if (!tipologia) {
    return {
      title: "Tipología no encontrada",
      robots: { index: false, follow: false },
    };
  }

  const primerRender =
    tipologia.renders[0]?.src ||
    tipologia.plantas[0]?.src ||
    "/images/Amenidades/Terralago Vista aérea.jpg";

  const titulo = `${tipologia.nombre} · ${tipologia.superficie} · Lomas Verdes`;

  return {
    title: titulo,
    description: `${tipologia.nombre} en Lomas Altas, Lomas Verdes, Naucalpan: ${tipologia.superficie} totales, ${tipologia.superficieInterior} interiores, ${tipologia.recamaras}. ${tipologia.unidades} unidades en la torre de Terralago.`,
    keywords: [
      `${tipologia.nombre} Lomas Altas`,
      `departamento ${tipologia.superficie} Lomas Verdes`,
      "departamentos en Lomas Verdes",
      "departamentos en venta Naucalpan",
      "Terralago",
    ],
    alternates: { canonical: `/espacios/${tipologia.slug}` },
    openGraph: {
      ...OG_BASE,
      title: `${tipologia.nombre} — Lomas Altas, Lomas Verdes`,
      description: `${tipologia.tagline}. ${tipologia.superficie} de superficie total en Terralago, Naucalpan.`,
      url: `/espacios/${tipologia.slug}`,
      images: [
        {
          url: primerRender,
          width: 1200,
          height: 800,
          alt: `${tipologia.nombre} en Lomas Altas, Lomas Verdes, Naucalpan`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tipologia.nombre} — Lomas Altas, Lomas Verdes`,
      description: `${tipologia.tagline}. ${tipologia.superficie} totales en Naucalpan.`,
      images: [primerRender],
    },
  };
}

export default async function TipologiaPage({ params }: PageProps) {
  const { slug } = await params;
  const tipologia = obtenerTipologiaPorSlug(slug);

  if (!tipologia) {
    notFound();
  }

  const apartment = apartmentFor(tipologia.slug);

  return (
    <>
      <JsonLd
        data={[
          ...(apartment ? [apartment] : []),
          breadcrumbList([
            { nombre: "Inicio", path: "/" },
            { nombre: "Espacios", path: "/espacios" },
            { nombre: tipologia.nombre, path: `/espacios/${tipologia.slug}` },
          ]),
        ]}
      />
      <TipologiaDetalle tipologia={tipologia} />
    </>
  );
}
