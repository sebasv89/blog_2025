export const siteTitle = "svelez blog";
export const siteIntro =
  "Book Reviews & anotaciones sobre Product Development, Liderazgo, AI y psicología del comportamiento.";

// URL del sitio para SEO/sitemaps (configurable por env en Vercel)
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://blog-2025.vercel.app";

// Orden deseado para las categorías (slugs de carpeta en /content)
export const categoryOrder: string[] = [
  "reviews-de-libros",
  "liderazgo-en-tech",
  "ai",
  "sicologia-del-comportamiento"
 
];

// Mapa opcional de nombres visibles por categoría (clave = slug de carpeta)
export const categoryNames: Record<string, string> = {
  "liderazgo-en-tech": "Liderazgo en tech",
  ai: "AI",
  "sicologia-del-comportamiento": "Sicología del comportamiento",
  "reviews-de-libros": "Reviews de Libros",
};


