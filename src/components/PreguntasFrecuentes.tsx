import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { PREGUNTAS_FRECUENTES } from "@/lib/seo";

/**
 * Home FAQ. Native <details>, no JavaScript: the answers are in the HTML on
 * first paint, which is what lets the FAQPage schema in page.tsx be honest.
 * This is where the geographic long-tail (Satélite, Atizapán, Presa Madín,
 * Lago Esmeralda, Zona Esmeralda) reads naturally instead of forced into a hero.
 */
export default function PreguntasFrecuentes() {
  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="faq-titulo"
      className="relative bg-cream pt-16 pb-20 md:pt-24 md:pb-28"
    >
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="flex items-center w-full gap-3 sm:gap-6 mb-3">
            <div className="flex-grow h-px bg-forest/20" />
            <h2
              id="faq-titulo"
              className="font-serif text-2xl md:text-3xl lg:text-4xl text-forest text-center text-balance"
            >
              Preguntas frecuentes
            </h2>
            <div className="flex-grow h-px bg-forest/20" />
          </div>
          <p className="font-serif italic text-lg sm:text-xl text-gold-dark text-center mb-12 sm:mb-16">
            Sobre vivir en Lomas Altas, Lomas Verdes y su entorno
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={150}>
          <div className="border-t border-forest/15">
            {PREGUNTAS_FRECUENTES.map((item, i) => (
              <details
                key={item.pregunta}
                className="group border-b border-forest/15"
                open={i === 0}
              >
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark [&::-webkit-details-marker]:hidden">
                  <span className="flex items-baseline gap-4">
                    <span className="font-serif text-[13px] tabular-nums text-[#7d6731] shrink-0">
                      0{i + 1}
                    </span>
                    <span className="font-serif text-lg sm:text-xl text-forest leading-snug">
                      {item.pregunta}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="font-serif text-2xl leading-none text-gold-dark transition-transform duration-300 group-open:rotate-45 shrink-0"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 pl-9 sm:pl-10 pr-10 font-sans text-sm sm:text-[15px] font-light leading-relaxed text-[#5c4a2c]">
                  {item.respuesta}
                </p>
              </details>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={200}>
          <p className="mt-10 text-center font-sans text-xs sm:text-sm font-light text-[#5c4a2c]/85">
            ¿Tienes otra duda sobre los departamentos en Lomas Verdes?{" "}
            <Link
              href="/contacto"
              className="text-forest underline decoration-gold-dark/60 underline-offset-4 transition-colors hover:text-gold-dark"
            >
              Escríbenos o agenda una visita
            </Link>
            .
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
