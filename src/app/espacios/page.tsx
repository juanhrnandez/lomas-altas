import type { Metadata } from "next";
import AcabadosSerie from "@/components/espacios/AcabadosSerie";
import BarraVisita from "@/components/espacios/BarraVisita";
import Colofon from "@/components/espacios/Colofon";
import CorteNiveles from "@/components/espacios/CorteNiveles";
import IndiceEspacios from "@/components/espacios/IndiceEspacios";
import Interludio from "@/components/espacios/Interludio";
import PlantaTipo from "@/components/espacios/PlantaTipo";
import PliegoInterior from "@/components/espacios/PliegoInterior";
import Portada from "@/components/espacios/Portada";
import Tipologias from "@/components/espacios/Tipologias";
import JsonLd from "@/components/JsonLd";
import { OG_BASE, breadcrumbList, espaciosCollection } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Departamentos y penthouses en Lomas Verdes, Naucalpan",
  description:
    "Cuatro tipologías de 188.94 a 384.84 m² en Lomas Altas, torre de 18 unidades en Terralago, Lomas Verdes, Naucalpan. Plantas, renders, acabados y corte por niveles.",
  keywords: [
    "departamentos en Lomas Verdes",
    "penthouses en Lomas Verdes",
    "departamentos nuevos Naucalpan",
    "tipologías Lomas Altas",
    "Terralago",
    "Planta Jardín",
  ],
  alternates: { canonical: "/espacios" },
  openGraph: {
    ...OG_BASE,
    title: "Espacios y distribuciones — Lomas Altas, Lomas Verdes",
    description:
      "Cuatro tipologías diseñadas a medida en Lomas Verdes, Naucalpan: Planta Jardín, Tipología A, Tipología B y Penthouses. Recorre la distribución, acabados y renders.",
    url: "/espacios",
    images: [
      {
        url: "/images/amenidades/terralago-vista-aerea.jpg",
        width: 4903,
        height: 3263,
        alt: "Vista aérea del conjunto Terralago con la torre Lomas Altas al centro, Lomas Verdes, Naucalpan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espacios y distribuciones — Lomas Altas, Lomas Verdes",
    description:
      "Cuatro tipologías residenciales desde 188.94 m² hasta 384.84 m², plantas interactivas y renders dedicados.",
    images: ["/images/amenidades/terralago-vista-aerea.jpg"],
  },
};

/**
 * /espacios — a builder's booklet: six numbered chapters read over strata of
 * paper (cream, sand, near-white, forest).
 *
 * No pt-24 here: every section owns its offset through var(--nav-h).
 * NEVER put overflow-hidden on this <main> — it would break the sticky index
 * and the sticky columns underneath. Use overflow-x-clip if a bleed needs
 * containing. The pb-20 under md is the cushion for the fixed mobile bar.
 */
export default function EspaciosPage() {
  return (
    <main className="flex-1 bg-cream pb-20 md:pb-0">
      <JsonLd
        data={[
          espaciosCollection(),
          breadcrumbList([
            { nombre: "Inicio", path: "/" },
            { nombre: "Espacios", path: "/espacios" },
          ]),
        ]}
      />
      <Portada />
      <IndiceEspacios />
      <Tipologias />
      <PlantaTipo />
      <PliegoInterior />
      <Interludio />
      <AcabadosSerie />
      <CorteNiveles />
      <Colofon />
      <BarraVisita />
    </main>
  );
}
