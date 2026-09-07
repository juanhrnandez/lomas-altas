/**
 * Single source of truth for SEO: site URL, brand, target keywords, the
 * sales-office data in schema.org shape, and the JSON-LD builders every route
 * uses. Nothing here is "use client": layouts, pages, sitemap and robots all
 * read it on the server.
 *
 * Target keywords (SEO brief): Lomas Altas · Naucalpan · Lomas Verdes ·
 * Satélite · Lomas de Satélite · Terralago · Atizapán · Atizapán de Zaragoza ·
 * Presa Madín · Lago Esmeralda · Zona Esmeralda.
 */

import { TIPOLOGIAS } from "@/components/espacios/espaciosData";
import { LAMINAS } from "@/lib/galeria";

// VERIFICAR ANTES DE PUBLICAR: NEXT_PUBLIC_SITE_URL debe apuntar al dominio
// final (https://…). Sin él, el sitemap, el canonical y el JSON-LD salen con
// localhost y Google los descarta.
export const SITE_URL: string = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const SITE_NAME = "Lomas Altas";
export const DEVELOPER_NAME = "Siermend";
export const SITE_TAGLINE = "El hogar donde todo crece";

/**
 * Absolute URL for a site-relative path.
 *
 * The site ships as a static export where every route is `<ruta>/index.html`
 * and next.config's `trailingSlash: true` writes every link as `/ruta/`. The
 * canonical, sitemap and JSON-LD URLs built here carry the same trailing slash,
 * so Google sees one URL per page instead of two. Files (`.jpg`, `.xml`…) and
 * query/hash are left untouched.
 */
export function absoluteUrl(path = "/"): string {
  const url = new URL(path, `${SITE_URL}/`);
  const esArchivo = /\.[a-z0-9]+$/i.test(url.pathname);
  if (!esArchivo && !url.pathname.endsWith("/")) {
    url.pathname += "/";
  }
  return url.toString();
}

/**
 * Next.js replaces the whole `openGraph` object when a route defines its own,
 * so locale and siteName vanish from every subpage unless spread back in.
 */
export const OG_BASE = {
  type: "website",
  locale: "es_MX",
  siteName: SITE_NAME,
} as const;

/**
 * Ordered by priority. The first five are the head terms; the rest are the
 * geographic long-tail the copy has to carry naturally.
 */
export const KEYWORDS: readonly string[] = [
  "Lomas Altas",
  "Lomas Verdes",
  "Naucalpan",
  "Terralago",
  "Satélite",
  "Lomas de Satélite",
  "Atizapán",
  "Atizapán de Zaragoza",
  "Presa Madín",
  "Lago Esmeralda",
  "Zona Esmeralda",
  "departamentos en Lomas Verdes",
  "departamentos en venta en Naucalpan",
  "departamentos en Satélite",
  "penthouses en Lomas Verdes",
  "torre residencial Terralago",
  "departamentos nuevos Naucalpan",
  "departamentos Atizapán de Zaragoza",
  "Siermend",
];

export const SALA_DE_VENTAS = {
  nombre: "Sala de ventas Lomas Altas",
  telefonoFmt: "56 1070 6351",
  telefonoE164: "+52-56-1070-6351",
  correo: "ventas@siermend.com",
  calle: "Avenida Lomas Verdes esq. Paseo de Lomas Verdes",
  colonia: "Lomas Verdes",
  municipio: "Naucalpan de Juárez",
  estado: "Estado de México",
  cp: "53125",
  pais: "MX",
  lat: 19.517566,
  lng: -99.267787,
  mapsUrl: "https://maps.google.com/?q=19.517566,-99.267787",
} as const;

const LOGO_URL = absoluteUrl("/images/loma-logo-clean.png");
const HERO_IMAGE_URL = absoluteUrl("/images/amenidades/terralago-vista-aerea.jpg");
const OG_IMAGE_URL = absoluteUrl("/opengraph-image.jpg");

const ORG_ID = `${SITE_URL}/#siermend`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const COMPLEX_ID = `${SITE_URL}/#lomas-altas`;
const OFFICE_ID = `${SITE_URL}/#sala-de-ventas`;
const TERRALAGO_ID = `${SITE_URL}/#terralago`;

/** Loose but typed enough to keep `@context` on every root node. A root may be a `@graph` container instead of a typed node. */
export type JsonLd = {
  "@context"?: string;
  "@type"?: string | string[];
  "@graph"?: Record<string, unknown>[];
} & Record<string, unknown>;

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: SALA_DE_VENTAS.calle,
    addressLocality: SALA_DE_VENTAS.municipio,
    addressRegion: SALA_DE_VENTAS.estado,
    postalCode: SALA_DE_VENTAS.cp,
    addressCountry: SALA_DE_VENTAS.pais,
  };
}

function geo() {
  return {
    "@type": "GeoCoordinates",
    latitude: SALA_DE_VENTAS.lat,
    longitude: SALA_DE_VENTAS.lng,
  };
}

/** Places the sales office serves — the geographic keywords as schema.org entities. */
function areaServed() {
  return [
    { "@type": "City", name: "Naucalpan de Juárez" },
    { "@type": "City", name: "Atizapán de Zaragoza" },
    { "@type": "Place", name: "Lomas Verdes" },
    { "@type": "Place", name: "Ciudad Satélite" },
    { "@type": "Place", name: "Lomas de Satélite" },
    { "@type": "Place", name: "Presa Madín" },
    { "@type": "Place", name: "Lago Esmeralda" },
    { "@type": "Place", name: "Zona Esmeralda" },
  ];
}

/**
 * Site-wide graph, rendered once from the root layout:
 * Organization (developer) → WebSite → ApartmentComplex (the tower) →
 * RealEstateAgent (the sales office, with hours and geo).
 */
export function siteGraph(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: DEVELOPER_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/logoSiermend.svg"),
        },
        email: SALA_DE_VENTAS.correo,
        telephone: SALA_DE_VENTAS.telefonoE164,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: SALA_DE_VENTAS.telefonoE164,
          email: SALA_DE_VENTAS.correo,
          contactType: "sales",
          areaServed: "MX",
          availableLanguage: ["es"],
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: `${SITE_NAME} — ${SITE_TAGLINE}`,
        description:
          "Torre residencial boutique de 18 departamentos y penthouses dentro de Terralago, en Lomas Verdes, Naucalpan. A minutos de Satélite, Atizapán de Zaragoza y Presa Madín.",
        inLanguage: "es-MX",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "Place",
        "@id": TERRALAGO_ID,
        name: "Terralago",
        description:
          "Conjunto residencial sobre Avenida Lomas Verdes, Naucalpan, dentro del cual se levanta la torre Lomas Altas.",
        address: postalAddress(),
        geo: geo(),
      },
      {
        "@type": "ApartmentComplex",
        "@id": COMPLEX_ID,
        name: SITE_NAME,
        alternateName: "Torre Lomas Altas Terralago",
        url: SITE_URL,
        image: [HERO_IMAGE_URL, OG_IMAGE_URL],
        logo: LOGO_URL,
        description:
          "Lomas Altas es una torre residencial de baja densidad dentro de Terralago, en Lomas Verdes, Naucalpan: 18 unidades en 5 niveles, con residencias Planta Jardín, departamentos Tipología A y B y dos penthouses dúplex. A minutos de Ciudad Satélite, Lomas de Satélite, Atizapán de Zaragoza, Presa Madín, Lago Esmeralda y Zona Esmeralda.",
        address: postalAddress(),
        geo: geo(),
        containedInPlace: { "@id": TERRALAGO_ID },
        numberOfAccommodationUnits: 18,
        numberOfAvailableAccommodationUnits: 18,
        accommodationFloorPlan: TIPOLOGIAS.map((t) => ({
          "@type": "FloorPlan",
          name: t.nombre,
          url: absoluteUrl(`/espacios/${t.slug}`),
          floorSize: {
            "@type": "QuantitativeValue",
            value: t.areas.total,
            unitCode: "MTK",
          },
        })),
        amenityFeature: [
          "Lobby jardín",
          "Gimnasio equipado",
          "Salón de eventos",
          "Roof garden",
          "Estacionamiento techado en tres sótanos",
          "Bodegas",
          "Acceso controlado",
        ].map((name) => ({
          "@type": "LocationFeatureSpecification",
          name,
          value: true,
        })),
        tourBookingPage: absoluteUrl("/contacto"),
        telephone: SALA_DE_VENTAS.telefonoE164,
        hasMap: SALA_DE_VENTAS.mapsUrl,
        keywords: KEYWORDS.join(", "),
      },
      {
        "@type": "RealEstateAgent",
        "@id": OFFICE_ID,
        name: SALA_DE_VENTAS.nombre,
        url: absoluteUrl("/contacto"),
        image: HERO_IMAGE_URL,
        logo: LOGO_URL,
        telephone: SALA_DE_VENTAS.telefonoE164,
        email: SALA_DE_VENTAS.correo,
        address: postalAddress(),
        geo: geo(),
        hasMap: SALA_DE_VENTAS.mapsUrl,
        parentOrganization: { "@id": ORG_ID },
        areaServed: areaServed(),
        priceRange: "$$$$",
        currenciesAccepted: "MXN",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "10:00",
            closes: "19:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "10:00",
            closes: "15:00",
          },
        ],
        makesOffer: {
          "@type": "Offer",
          itemOffered: { "@id": COMPLEX_ID },
          availability: "https://schema.org/InStock",
          areaServed: areaServed(),
        },
      },
    ],
  };
}

export interface Miga {
  nombre: string;
  /** Site-relative path, e.g. "/espacios". */
  path: string;
}

export function breadcrumbList(migas: readonly Miga[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: migas.map((miga, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: miga.nombre,
      item: absoluteUrl(miga.path),
    })),
  };
}

export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

/**
 * The FAQ is where the geographic long-tail lives. It is rendered visibly on
 * the home page (Google requires the answers to be on the page) and mirrored
 * here as FAQPage.
 */
export const PREGUNTAS_FRECUENTES: readonly PreguntaFrecuente[] = [
  {
    pregunta: "¿Dónde se ubica Lomas Altas?",
    respuesta:
      "Lomas Altas está sobre Avenida Lomas Verdes, esquina con Paseo de Lomas Verdes, C.P. 53125, en Naucalpan de Juárez, Estado de México. La torre forma parte del conjunto residencial Terralago, en una de las zonas con mayor plusvalía de Lomas Verdes.",
  },
  {
    pregunta: "¿Qué zonas quedan cerca de Lomas Altas?",
    respuesta:
      "Desde Lomas Verdes se llega en minutos a Ciudad Satélite y Plaza Satélite, a Lomas de Satélite y a Atizapán de Zaragoza. Hacia el norte quedan la Presa Madín, Lago Esmeralda y Zona Esmeralda, y las salidas a Chamapa–Lechería y Periférico están a la mano. Colegio Alemán, Colegio Carol Baur, UVM Lomas Verdes, Bellavista Country Club y La Cúspide Sky Mall están en el entorno inmediato.",
  },
  {
    pregunta: "¿Qué tipos de departamentos hay en Lomas Altas?",
    respuesta:
      "Son 18 unidades en 5 niveles, repartidas en cuatro tipologías: 2 residencias Planta Jardín de 351.36 m² con jardín privado, 8 departamentos Tipología A de 191 m², 6 departamentos Tipología B de 188.94 m² y 2 penthouses dúplex de 384.84 m² con terraza y patio privado. Todos incluyen terraza techada y de 2 a 3 cajones de estacionamiento techados.",
  },
  {
    pregunta: "¿Qué amenidades incluye la torre?",
    respuesta:
      "Lobby jardín, gimnasio equipado, salón de eventos con comedor social, roof garden, bodegas y tres sótanos de estacionamiento con acceso controlado. Es un desarrollo de baja densidad: 18 familias comparten un solo acceso y un solo vestíbulo.",
  },
  {
    pregunta: "¿Cómo agendo una visita a la sala de ventas?",
    respuesta:
      "Llama o escribe por WhatsApp al 56 1070 6351, envía un correo a ventas@siermend.com o llena la solicitud en la página de contacto. La sala de ventas, dentro del desarrollo en Lomas Verdes, Naucalpan, abre de lunes a viernes de 10:00 a 19:00 y sábados de 10:00 a 15:00; los domingos se atiende sólo con cita previa.",
  },
  {
    pregunta: "¿Quién desarrolla Lomas Altas?",
    respuesta:
      "Lomas Altas es un desarrollo de Siermend, dentro del conjunto Terralago, en Lomas Verdes, Naucalpan de Juárez, Estado de México.",
  },
];

export function faqPage(preguntas: readonly PreguntaFrecuente[] = PREGUNTAS_FRECUENTES): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: p.respuesta },
    })),
  };
}

/** One typology as a schema.org Apartment inside the complex. */
export function apartmentFor(slug: string): JsonLd | null {
  const t = TIPOLOGIAS.find((item) => item.slug === slug);
  if (!t) return null;

  const url = absoluteUrl(`/espacios/${t.slug}`);
  const images = [...t.renders.map((r) => absoluteUrl(r.src)), ...t.plantas.map((p) => absoluteUrl(p.src))];
  const recamaras = Number.parseInt(t.recamaras, 10);
  const banos = Number.parseFloat(t.banos);

  return {
    "@context": "https://schema.org",
    "@type": "Apartment",
    "@id": `${url}#apartment`,
    name: `${t.nombre} — Lomas Altas`,
    alternateName: t.codigo,
    url,
    description: `${t.tagline}. ${t.parrafo} Departamento en Lomas Verdes, Naucalpan, dentro de Terralago.`,
    image: images,
    floorSize: { "@type": "QuantitativeValue", value: t.areas.total, unitCode: "MTK" },
    numberOfRooms: Number.isNaN(recamaras) ? undefined : recamaras,
    numberOfBedrooms: Number.isNaN(recamaras) ? undefined : recamaras,
    numberOfBathroomsTotal: Number.isNaN(banos) ? undefined : banos,
    floorLevel: t.niveles,
    containedInPlace: { "@id": COMPLEX_ID },
    address: postalAddress(),
    geo: geo(),
    amenityFeature: t.puntosClave.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/contacto?modelo=${encodeURIComponent(t.slug)}#solicitud`),
      availability: "https://schema.org/InStock",
      offeredBy: { "@id": OFFICE_ID },
      businessFunction: "http://purl.org/goodrelations/v1#Sell",
      priceCurrency: "MXN",
    },
  };
}

/** /espacios as a CollectionPage listing the four typologies. */
export function espaciosCollection(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/espacios")}#page`,
    url: absoluteUrl("/espacios"),
    name: "Espacios y distribuciones — Lomas Altas",
    description:
      "Cuatro tipologías de departamentos y penthouses en Lomas Verdes, Naucalpan, dentro de Terralago: superficies, plantas, acabados y corte del edificio.",
    inLanguage: "es-MX",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": COMPLEX_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: TIPOLOGIAS.length,
      itemListElement: TIPOLOGIAS.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.nombre,
        url: absoluteUrl(`/espacios/${t.slug}`),
      })),
    },
  };
}

/** /galeria as an ImageGallery with every plate as an ImageObject. */
export function galeriaImageGallery(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${absoluteUrl("/galeria")}#gallery`,
    url: absoluteUrl("/galeria"),
    name: "Galería — Lomas Altas en doce láminas",
    description:
      "Renders de exteriores, áreas comunes, interiores y planos de la torre Lomas Altas en Terralago, Lomas Verdes, Naucalpan.",
    inLanguage: "es-MX",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": COMPLEX_ID },
    associatedMedia: LAMINAS.map((l) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(l.src),
      url: absoluteUrl(l.src),
      name: l.titulo,
      caption: l.epigrafe,
      description: l.alt,
      width: l.width,
      height: l.height,
      representativeOfPage: l.id === "01",
      creditText: DEVELOPER_NAME,
    })),
  };
}

/** /contacto as a ContactPage pointing at the sales office node. */
export function contactPage(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absoluteUrl("/contacto")}#page`,
    url: absoluteUrl("/contacto"),
    name: "Contacto — Sala de ventas Lomas Altas en Lomas Verdes, Naucalpan",
    inLanguage: "es-MX",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": COMPLEX_ID },
    mainEntity: { "@id": OFFICE_ID },
  };
}

/** Home as the WebPage that introduces the complex. */
export function homePage(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#home`,
    url: SITE_URL,
    name: "Lomas Altas — Departamentos y penthouses en Lomas Verdes, Naucalpan",
    inLanguage: "es-MX",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": COMPLEX_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: HERO_IMAGE_URL,
      caption: "Vista aérea de la torre Lomas Altas dentro de Terralago, Lomas Verdes, Naucalpan",
    },
  };
}
