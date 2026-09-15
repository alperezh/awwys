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
├── js/config.js        # Project ID de Sanity (público)
├── js/sanity.js        # cliente de lectura + consulta GROQ
├── js/cms.js           # hidrata textos e imágenes sobre el HTML de respaldo
├── studio/             # Sanity Studio (esquemas del contenido)
├── scripts/seed.mjs    # carga inicial de contenido
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

## Contenido gestionable (Sanity)

Misma arquitectura que The Funky Factory: el contenido vive en **Sanity**, el
front lo pide **en runtime** con una sola consulta GROQ y, si el CMS no está
configurado o falla, se queda con el **contenido de respaldo** del HTML (los
personajes dibujados en SVG y los fondos de degradado). La web nunca se ve rota.

```
Navegador  ──►  js/cms.js  ──►  Sanity (API de lectura por CDN)
                    │
                    └─ si no hay respuesta: contenido de respaldo del HTML
```

### Qué imagen controla cada cosa

| Documento en el Studio | Qué imagen gobierna |
|---|---|
| **Carrusel de portada** | fondo de cada slide (y su versión móvil) + la figura recortada |
| **Paneles de imagen** | las seis fotos grandes: tres de la franja de colección y tres de "our world" |
| **Personajes** | la foto de cada Awwy, en la rejilla y allí donde se le enlace |
| **Franja de iconos** | los cuatro iconos bajo el carrusel |
| **Configuración del sitio** | logotipo y favicon |

Cada campo de imagen es opcional: mientras esté vacío se usa el dibujo o el
degradado. Se pueden ir sustituyendo de una en una según lleguen las fotos
reales, sin tocar código.

### Puesta en marcha

```bash
cd studio
npm install
npx sanity init            # login → crea proyecto → te da el PROJECT ID
cp .env.example .env       # pega el SANITY_STUDIO_PROJECT_ID
npm run dev                # Studio en http://localhost:3333
npm run deploy             # para dejarlo en https://<nombre>.sanity.studio
```

Carga inicial de textos (idéntica a lo que hay hoy en el HTML, sin imágenes),
para que el Studio no arranque vacío:

```bash
cd scripts
cp .env.example .env       # PROJECT ID + token Editor (sanity.io/manage → API → Tokens)
npm install && npm run seed
```

Y por último, conectar el front: pega el Project ID en `js/config.js`. Mientras
esté vacío, la web sigue usando el contenido de respaldo.

## Despliegue en Vercel

Sitio estático puro: **sin build, sin framework**. En Vercel se importa el repo
y se deja *Framework Preset* en `Other`, *Build Command* vacío y *Output
Directory* en la raíz (`.`). Cada push a `main` publica.

Desde la máquina de uno, sin pasar por la UI:

```bash
npx vercel          # primera vez: pregunta y crea el proyecto (preview)
npx vercel --prod   # publica en producción
```

`vercel.json` fija dos cosas: cabeceras de caché de un año para `fonts/`
(inmutables, van con hash de contenido en el nombre) y `cleanUrls`, para que las
páginas que añadamos se sirvan sin `.html` (`/shop` en vez de `/shop.html`).

Para `awwys.com`: *Project → Settings → Domains*, añadir el dominio y apuntar
el DNS del registrador a los valores que indique Vercel (un `A` a la IP de
Vercel para el ápex y un `CNAME` para `www`). El HTTPS lo gestiona Vercel.

## Pendiente (siguientes iteraciones)

- Fotografía real de producto y packaging en lugar de los SVG y los degradados.
- Páginas internas: shop, ficha de personaje, our world, about.
- Conectar catálogo y carrito (se puede reaprovechar el backend de The Funky Factory).
- Subir las fotos reales desde el Studio, sustituyendo los dibujos de respaldo.
- Copys definitivos y versión en castellano.
