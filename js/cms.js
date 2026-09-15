/* Awwy's · hidratación del contenido desde el CMS.
 * Sustituye textos e imágenes de los elementos que YA existen en el HTML, sin
 * cambiar el markup ni el CSS. Lo que el CMS no defina conserva el contenido de
 * respaldo (los personajes en SVG y los fondos de degradado).
 */
(function () {
  const S = window.AwwysSanity;
  if (!S || !S.isConfigured()) return;

  const q = (sel, root = document) => root.querySelector(sel);
  const qa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const setText = (node, val) => { if (node && val) node.textContent = val; };
  const setHTML = (node, val) => { if (node && val) node.innerHTML = S.renderTexto(val); };

  /** Pone una foto de fondo en un panel y apaga el degradado de respaldo. */
  function setFondo(node, url, ancho) {
    if (!node || !url) return;
    node.style.backgroundImage = `url("${S.img(url, ancho)}")`;
    node.classList.add('has-foto');
  }

  /** Sustituye la figura SVG por la foto del producto. */
  function setFigura(stage, url, alt, ancho) {
    if (!stage || !url) return;
    const im = document.createElement('img');
    im.src = S.img(url, ancho);
    im.alt = alt || '';
    im.loading = 'lazy';
    stage.replaceChildren(im);
    stage.classList.add('has-foto');
  }

  // --- configuración general ----------------------------------------------
  function hidratarConfig(c) {
    if (!c) return;
    if (c.tituloSEO) document.title = c.tituloSEO;
    const meta = (sel, val) => { const n = q(sel); if (n && val) n.setAttribute('content', val); };
    meta('meta[name="description"]', c.descripcionSEO);
    meta('meta[name="theme-color"]', c.themeColor);
    if (c.faviconUrl) { const n = q('link[rel="icon"]'); if (n) n.href = c.faviconUrl; }

    // Logotipo: si suben una imagen, sustituye al texto con contorno.
    if (c.logoUrl) {
      qa('.brand__word').forEach((w) => {
        const im = document.createElement('img');
        im.src = S.img(c.logoUrl, 320);
        im.alt = "Awwy's";
        im.className = 'brand__img';
        w.replaceWith(im);
      });
    }

    const navA = qa('.nav__link');
    (c.menuPrincipal || []).forEach((item, i) => {
      const a = navA[i];
      if (!a) return;
      if (item.url) a.href = item.url;
      const txt = Array.from(a.childNodes).find((n) => n.nodeType === 3 && n.textContent.trim());
      if (txt && item.texto) txt.textContent = item.texto + ' ';
    });

    const footA = qa('.footer__nav a');
    (c.footerEnlaces || []).forEach((item, i) => {
      if (!footA[i]) return;
      setText(footA[i], item.texto);
      if (item.url) footA[i].href = item.url;
    });
    (c.redes || []).forEach((r, i) => {
      const a = qa('.footer__social a')[i];
      if (a && r.url) a.href = r.url;
    });
    const claim = q('.footer__claim');
    if (claim && c.footerClaim) claim.innerHTML = `${S.renderTexto(c.footerClaim)} <span class="heart">♡</span>`;
    setText(q('.footer__brand small'), c.footerMarca);
  }

  // --- carrusel ------------------------------------------------------------
  function hidratarCarrusel(data) {
    const slides = qa('.hero__slide');
    (data?.slides || []).forEach((s, i) => {
      const el = slides[i];
      if (!el) return;
      setFondo(el, s.fondoUrl, 2000);
      setHTML(q('.hero__col .hand', el), s.textoIzquierda);
      setHTML(q('.kicker', el), s.kicker);
      setHTML(q('.hand--right', el), s.textoDerecha);
      const cta = q('.btn', el);
      if (cta && s.ctaTexto) cta.innerHTML = `${S.renderTexto(s.ctaTexto)} <span aria-hidden="true">→</span>`;
      if (cta && s.ctaEnlace) cta.href = s.ctaEnlace;
      setFigura(q('.hero__stage', el), s.figuraUrl || s.personaje?.imagenUrl, s.altText, 900);
    });
  }

  // --- franja de valores ---------------------------------------------------
  function hidratarValores(valores) {
    const nodos = qa('.value');
    (valores || []).forEach((v, i) => {
      const el = nodos[i];
      if (!el) return;
      setText(q('h3', el), v.titulo);
      setText(q('p', el), v.subtitulo);
      if (v.iconoUrl) {
        const im = document.createElement('img');
        im.src = S.img(v.iconoUrl, 120);
        im.alt = '';
        im.className = 'value__icon';
        q('.value__icon', el)?.replaceWith(im);
      }
    });
  }

  // --- paneles (colección y nuestro mundo) ---------------------------------
  function hidratarPaneles(paneles) {
    const porZona = {
      coleccion: qa('.duo .panel'),
      mundo: qa('.trio .panel'),
    };
    (paneles || []).forEach((p) => {
      const lista = porZona[p.zona] || [];
      const el = lista[(p.orden || 1) - 1];
      if (!el) return;
      setFondo(el, p.fondoUrl, 1400);
      setHTML(q('.hand--sm', el), p.rotulo);
      setHTML(q('.panel__claim', el), p.claim);
      const cta = q('.panel__cta, .btn', el);
      if (cta && p.ctaTexto) cta.innerHTML = `${S.renderTexto(p.ctaTexto)} <span aria-hidden="true">→</span>`;
      if (cta && p.ctaEnlace) cta.href = p.ctaEnlace;
      const figura = p.figuraUrl || p.personaje?.imagenUrl;
      if (figura) {
        const stage = q('.panel__stage', el) || q('.box', el)?.parentElement;
        // En los paneles de caja, la foto sustituye a la caja dibujada.
        const caja = q('.box', el);
        if (caja && !q('.panel__stage', el)) {
          const im = document.createElement('img');
          im.src = S.img(figura, 900);
          im.alt = p.altText || '';
          im.className = 'panel__foto';
          caja.replaceWith(im);
        } else {
          setFigura(stage, figura, p.altText, 900);
        }
      }
    });
  }

  // --- personajes ----------------------------------------------------------
  function hidratarPersonajes(personajes, cabecera) {
    if (cabecera) {
      setText(q('.characters h2'), cabecera.titulo);
      setText(q('.characters__title p'), cabecera.subtitulo);
      const a = q('.characters__head .link-arrow');
      if (a && cabecera.enlaceTexto) a.innerHTML = `${S.renderTexto(cabecera.enlaceTexto)} <span aria-hidden="true">→</span>`;
      if (a && cabecera.enlaceUrl) a.href = cabecera.enlaceUrl;
    }
    if (!personajes || !personajes.length) return;

    const grid = q('[data-char-grid]');
    if (!grid) return;
    grid.innerHTML = personajes.map((p) => {
      const num = String(p.numero ?? '').padStart(2, '0');
      const arte = p.imagenUrl
        ? `<img src="${S.img(p.imagenUrl, 500)}" alt="${p.nombre || ''}" loading="lazy">`
        : '';
      const href = p.slug ? `/personajes/${p.slug}` : '#collection';
      return `
      <li class="char">
        <a class="char__art${p.imagenUrl ? ' has-foto' : ''}" href="${href}" aria-label="${p.nombre || ''}">${arte}</a>
        <p class="char__name">${num} ${S.renderTexto(p.nombre)}</p>
        <p class="char__tag">${S.renderTexto(p.frase)}</p>
      </li>`;
    }).join('');

    // Los personajes sin foto se siguen dibujando en SVG.
    if (window.AwwysArte) {
      qa('.char__art:not(.has-foto)', grid).forEach((art, i) => {
        art.innerHTML = window.AwwysArte.svgPorNumero(personajes[i]?.numero);
      });
    }
  }

  // --- newsletter ----------------------------------------------------------
  function hidratarNewsletter(n) {
    if (!n) return;
    const h = q('.news h2');
    if (h && n.titulo) h.innerHTML = `${S.renderTexto(n.titulo)} <span class="heart">♡</span>`;
    setText(q('.news__inner > p'), n.texto);
    const input = q('#news-email');
    if (input && n.placeholder) input.placeholder = n.placeholder;
    const btn = q('.news__form .btn');
    if (btn && n.ctaTexto) btn.innerHTML = `${S.renderTexto(n.ctaTexto)} <span aria-hidden="true">→</span>`;
    if (n.mensajeOk) document.documentElement.dataset.newsOk = n.mensajeOk;
  }

  S.fetchContenido().then((data) => {
    if (!data) return;
    hidratarConfig(data.config);
    hidratarCarrusel(data.carrusel);
    hidratarValores(data.valores);
    hidratarPaneles(data.paneles);
    hidratarPersonajes(data.personajes, data.personajesCabecera);
    hidratarNewsletter(data.newsletter);
    document.body.classList.add('cms-cargado');
  });
})();
