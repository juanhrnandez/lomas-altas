# Lomas Altas

Sitio de [Next.js](https://nextjs.org) para la torre residencial Lomas Altas (Terralago, Lomas Verdes, Naucalpan). Se publica como **sitio estático**: el build genera una carpeta `dist/` lista para subir a cualquier servidor HTML.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build estático (dist)

El dominio final tiene que ir en `NEXT_PUBLIC_SITE_URL` **antes** de construir: se hornea en el canonical, el `sitemap.xml`, el `robots.txt` y los datos estructurados (JSON-LD). Sin él, esas URLs salen apuntando a `localhost`.

```bash
NEXT_PUBLIC_SITE_URL=https://www.tudominio.com npm run build
```

O deja el valor en un archivo `.env.production` (está en `.gitignore`):

```
NEXT_PUBLIC_SITE_URL=https://www.tudominio.com
```

y ejecuta `npm run build`. El resultado queda en `dist/`:

```
dist/
├── index.html
├── 404.html
├── espacios/index.html
├── espacios/ta/index.html          (y ta-nj-pb, tb, ta-ph-pb)
├── galeria/index.html
├── contacto/index.html
├── sitemap.xml · robots.txt · manifest.webmanifest
├── images/ · icon.svg · opengraph-image.jpg …
└── _next/static/                   (JS, CSS y fuentes autoalojadas)
```

Para probarlo en local antes de subirlo:

```bash
npm run preview
```

### Subirlo al servidor

Copia **todo el contenido** de `dist/` a la raíz pública del servidor (`public_html`, `htdocs`, `/var/www/...`). Cada ruta es una carpeta con su `index.html`, así que `/espacios/` funciona en Nginx, Apache, S3, GitHub Pages o cualquier hosting estático sin reglas de reescritura. Recomendado, no obligatorio:

- Servir `404.html` como página de error 404.
- Redirigir `/espacios` → `/espacios/` (la mayoría de servidores ya lo hacen para carpetas).
- Cachear `_next/static/` con `Cache-Control: max-age=31536000, immutable` (los nombres llevan hash).

Después de publicar: enviar `https://tudominio/sitemap.xml` en Google Search Console y validar las páginas en el [Rich Results Test](https://search.google.com/test/rich-results).

## SEO

Toda la capa SEO vive en `src/lib/seo.ts` (keywords objetivo, datos de la sala de ventas, constructores JSON-LD) y `src/lib/zonas.ts` (zonas cercanas que se muestran en la página). `robots.txt`, `sitemap.xml` y el manifest se generan desde `src/app/robots.ts`, `sitemap.ts` y `manifest.ts`.
