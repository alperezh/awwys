# Awwy's — awwys.com

Sitio de **Awwy's**, la colección de personajes coleccionables: *little
characters, big personalities*.

Ahora mismo es la **maqueta estática** de la home (HTML + CSS + JS puro, sin
build ni dependencias), pensada para cerrar el diseño antes de conectar
catálogo, carrito o CMS. Pensado para servirse como sitio estático
(S3 + CloudFront o cualquier hosting de ficheros).

```bash
python3 -m http.server 8811     # http://localhost:8811/
```

## Estructura

```
.
├── index.html          # todas las secciones de la home
├── css/styles.css      # tokens de diseño + estilos (mobile first en los @media)
├── js/app.js           # personajes SVG, carrusel, menú, newsletter
├── fonts/              # Caveat, Nunito Sans y Baloo 2 auto-hospedadas (woff2)
└── img/favicon.svg
```

## Secciones de la home

1. **Top bar** — logo, navegación, buscador, cuenta y carrito con contador.
2. **Hero carrusel** — 3 slides, autoplay 6,5 s, flechas y puntos.
3. **Franja de valores** — Collect / Create / Be Awwy! / A brighter tomorrow.
4. **Banner de colección** — dos escenas + la caja ciega en el centro.
5. **Meet the Awwy's** — los 10 personajes de la serie 01 con nombre y frase.
6. **Our world** — escena, panel rosa con claim y caja.
7. **Newsletter** + **footer** (enlaces, redes y claim).

## Arte: SVG generado, no fotos

No hay ni una imagen de producto: cada Awwy se dibuja en el cliente desde
`AWWYS` en `js/app.js` (color del chubasquero, tipo de capucha, ojos y
complemento). Así se puede probar la composición sin esperar al render 3D o a
la sesión de fotos; cuando existan las fotos reales, se sustituye el
`[data-awwy]` por un `<img>` sin tocar el layout.

Los fondos tipo foto (`.ph--rain`, `.ph--leaf`, …) son degradados con bokeh en
CSS: mismo papel de sustituto temporal.

Añadir un personaje = añadir un objeto al array:

```js
{ id:'11', name:'Snow', tag:'Quiet as first snow.',
  coat:'#e7f1fb', hood:'plain', eyes:'happy', extra:'drops' }
```

- `hood`: `plain` · `frog` · `panda` · `cloud`
- `eyes`: `open` · `happy` · `sleep`
- `extra`: `drops` · `umbrella` · `leaf` · `boat` · `''`
- `coat`: hex o `'rainbow'` (degradado iridiscente)

## Tokens de diseño

En `:root` (`css/styles.css`): crema `#f6f1e8`, tinta `#211f1d`, rosa `#ff8cc0`
y los colores de los personajes; tipografías `--font-hand` (Caveat, rótulos
manuscritos), `--font-ui` (Nunito Sans) y `--font-logo` (Baloo 2, logotipo con
contorno). Cambiar la paleta desde ahí afecta a toda la página.

## Pendiente (siguientes iteraciones)

- Fotografía real de producto y packaging en lugar de los SVG y los degradados.
- Páginas internas: shop, ficha de personaje, our world, about.
- Conectar catálogo y carrito (se puede reaprovechar el backend de The Funky Factory).
- Copys definitivos y versión en castellano.
