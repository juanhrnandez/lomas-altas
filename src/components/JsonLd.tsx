import type { JsonLd as JsonLdNode } from "@/lib/seo";

interface JsonLdProps {
  /** One node or several; each becomes its own <script>. */
  data: JsonLdNode | readonly JsonLdNode[];
}

/**
 * Structured data as JSON-LD. Server Component — no hydration, no client JS.
 * `<` is escaped so a stray "</script>" inside a string can never close the tag.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const nodos = Array.isArray(data) ? data : [data];

  return (
    <>
      {nodos.map((nodo, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(nodo).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
