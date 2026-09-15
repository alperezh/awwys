/* Awwy's · cliente de lectura de Sanity (sin dependencias).
 * Expone window.AwwysSanity con isConfigured(), fetchContenido() e img().
 */
(function () {
  const cfg = (window.AWWYS && window.AWWYS.sanity) || {};

  const isConfigured = () => Boolean(cfg.projectId && cfg.projectId.trim());

  /** URL del CDN de imágenes con ancho y formato automático. */
  function img(url, width) {
    if (!url) return '';
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}auto=format&fit=max${width ? `&w=${width}` : ''}`;
  }

  /** Escapa HTML y convierte saltos de línea en <br> (única vía de markup). */
  function renderTexto(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\r?\n/g, '<br>');
  }

  // Una sola consulta trae todo el contenido del sitio.
  const QUERY = `{
    "config": *[_type == "configuracionSitio"][0]{
      tituloSEO, descripcionSEO, themeColor,
      "faviconUrl": favicon.asset->url,
      "logoUrl": logo.asset->url,
      menuPrincipal[]{texto, url},
      redes[]{plataforma, url},
      footerEnlaces[]{texto, url},
      footerClaim, footerMarca, footerLegal
    },
    "carrusel": *[_type == "carruselHero"][0]{
      slides[]{
        altText, textoIzquierda, kicker, ctaTexto, ctaEnlace, textoDerecha,
        "fondoUrl": fondo.asset->url,
        "fondoMovilUrl": fondoMovil.asset->url,
        "figuraUrl": figura.asset->url,
        personaje->{numero, nombre, "imagenUrl": imagen.asset->url}
      }
    },
    "valores": *[_type == "valor"] | order(orden asc){
      titulo, subtitulo, "iconoUrl": icono.asset->url, orden
    },
    "paneles": *[_type == "panel"] | order(zona asc, orden asc){
      zona, orden, tipo, rotulo, claim, ctaTexto, ctaEnlace, altText,
      "fondoUrl": fondo.asset->url,
      "figuraUrl": figura.asset->url,
      personaje->{numero, nombre, "imagenUrl": imagen.asset->url}
    },
    "personajes": *[_type == "personaje"] | order(numero asc){
      numero, nombre, frase, "slug": slug.current,
      "imagenUrl": imagen.asset->url
    },
    "personajesCabecera": *[_type == "seccionPersonajes"][0]{
      titulo, subtitulo, enlaceTexto, enlaceUrl
    },
    "newsletter": *[_type == "newsletter"][0]{
      titulo, texto, placeholder, ctaTexto, mensajeOk
    }
  }`;

  async function fetchContenido() {
    if (!isConfigured()) return null;
    const ver = cfg.apiVersion || '2024-01-01';
    const url =
      `https://${cfg.projectId}.apicdn.sanity.io/v${ver}/data/query/` +
      `${encodeURIComponent(cfg.dataset || 'production')}` +
      `?query=${encodeURIComponent(QUERY)}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()).result || null;
    } catch (err) {
      console.warn('[AwwysSanity] CMS no disponible, uso el contenido de respaldo:', err.message);
      return null;
    }
  }

  window.AwwysSanity = { isConfigured, fetchContenido, img, renderTexto };
})();
