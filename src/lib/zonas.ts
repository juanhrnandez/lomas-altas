/**
 * Nearby zones — the geographic keywords of the SEO brief, in the order they
 * read best in a sentence. Kept in its own tiny module so client components
 * (the map section) can import it without dragging the whole SEO graph along.
 */
export interface ZonaCercana {
  nombre: string;
  nota: string;
}

export const ZONAS_CERCANAS: readonly ZonaCercana[] = [
  { nombre: "Ciudad Satélite", nota: "Plaza Satélite y Circuito Comercial" },
  { nombre: "Lomas de Satélite", nota: "Colonia residencial vecina" },
  { nombre: "Atizapán de Zaragoza", nota: "Municipio colindante al norte" },
  { nombre: "Presa Madín", nota: "Zona de vistas y paseos" },
  { nombre: "Lago Esmeralda", nota: "Residencial y club de golf" },
  { nombre: "Zona Esmeralda", nota: "Corredor comercial y escolar" },
];
