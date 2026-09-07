import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ElDesarrollo from "@/components/ElDesarrollo";
import Estructura from "@/components/Estructura";
import Fachada from "@/components/Fachada";
import Ubicacion from "@/components/Ubicacion";
import Espacios from "@/components/Espacios";
import Amenidades from "@/components/Amenidades";
import PreguntasFrecuentes from "@/components/PreguntasFrecuentes";
import Contacto from "@/components/Contacto";
import JsonLd from "@/components/JsonLd";
import { faqPage, homePage } from "@/lib/seo";

// The root layout already carries the site-wide title, description, OG and
// Twitter cards; here only the self-referencing canonical is added.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="flex-1">
      <JsonLd data={[homePage(), faqPage()]} />
      <Hero />
      <ElDesarrollo />
      <Ubicacion />
      <Espacios />
      <Amenidades />
      <Estructura />
      <Fachada />
      <PreguntasFrecuentes />
      <Contacto />
    </main>
  );
}
