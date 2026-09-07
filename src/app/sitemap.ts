import type { MetadataRoute } from "next";
import { TIPOLOGIAS } from "@/components/espacios/espaciosData";
import { LAMINAS } from "@/lib/galeria";
import { absoluteUrl } from "@/lib/seo";

// Required by output: "export" — the file is written once at build time.
export const dynamic = "force-static";

/**
 * Every indexable URL, with the images each page shows so they enter Google
 * Images under the page's keywords. Only canonical routes: no hash anchors,
 * no ?modelo= variants.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  const hero = absoluteUrl("/images/amenidades/terralago-vista-aerea.jpg");

  const home: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/"),
    lastModified: ahora,
    changeFrequency: "weekly",
    priority: 1,
    images: [
      hero,
      absoluteUrl("/images/generales/terralago-fachada-lateral.jpg"),
      absoluteUrl("/images/generales/terralago-fachada-frontal.jpg"),
      absoluteUrl("/images/amenidades/terralago-gym.jpg"),
      absoluteUrl("/images/amenidades/tt-lobby-06-2x.jpg"),
      absoluteUrl("/images/amenidades/terralago-salon.jpg"),
      absoluteUrl("/images/distribucion-plantas.jpg"),
    ],
  };

  const espacios: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/espacios"),
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.9,
    images: [
      hero,
      absoluteUrl("/images/render.jpg"),
      absoluteUrl("/images/distribucion-plantas.jpg"),
      absoluteUrl("/images/estancia-comedor.jpg"),
    ],
  };

  const tipologias: MetadataRoute.Sitemap = TIPOLOGIAS.map((t) => ({
    url: absoluteUrl(`/espacios/${t.slug}`),
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [...t.plantas.map((p) => absoluteUrl(p.src)), ...t.renders.map((r) => absoluteUrl(r.src))],
  }));

  const galeria: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/galeria"),
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.7,
    images: LAMINAS.map((l) => absoluteUrl(l.src)),
  };

  const contacto: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/contacto"),
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [hero],
  };

  return [home, espacios, ...tipologias, galeria, contacto];
}
