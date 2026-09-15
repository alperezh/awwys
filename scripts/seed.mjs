/* Awwy's · carga inicial del contenido en Sanity.
 *
 * Crea los documentos con los MISMOS textos que hoy trae el HTML de respaldo,
 * para que el Studio no arranque vacío. No sube imágenes: esas las pone la
 * persona que gestione el contenido desde el Studio.
 *
 * Es idempotente (usa createOrReplace con ids fijos): puedes reejecutarlo.
 *
 *   cp .env.example .env    # PROJECT ID + token con permiso de escritura
 *   npm install && npm run seed
 */
import { createClient } from '@sanity/client';
import 'dotenv/config';

const { SANITY_PROJECT_ID, SANITY_DATASET = 'production', SANITY_TOKEN } = process.env;

if (!SANITY_PROJECT_ID || !SANITY_TOKEN) {
  console.error('Faltan SANITY_PROJECT_ID o SANITY_TOKEN en .env');
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN,
  useCdn: false,
});

const PERSONAJES = [
  [1, 'Drizzle', 'Finds beauty\nin quiet rains.'],
  [2, 'Umbrella', 'Brings a little\nsunshine anyway.'],
  [3, 'Puddle', 'Small moments,\nbig joy.'],
  [4, 'Cloudy', 'Soft days\nare still bright.'],
  [5, 'Paper Boat', 'Big dreams\nin little boats.'],
  [6, 'Waiting', 'Good things\ntake time.'],
  [7, 'Joy', 'Dances in\nthe little things.'],
  [8, 'Leaf', 'Nature\nalways protects.'],
  [9, 'Cozy', 'Rainy days\nfeel safer.'],
  [10, 'Rainbow', "After rain,\nthere's always color."],
];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const docs = [
  {
    _id: 'configuracionSitio',
    _type: 'configuracionSitio',
    tituloSEO: "Awwy's · Little characters. Big personalities.",
    descripcionSEO: "Awwy's — collectible little characters that make everything brighter.",
    themeColor: '#f6f1e8',
    menuPrincipal: [
      { _key: 'm1', texto: 'Shop', url: '#collection' },
      { _key: 'm2', texto: 'Characters', url: '#characters' },
      { _key: 'm3', texto: 'Our world', url: '#world' },
      { _key: 'm4', texto: 'About', url: '#about' },
    ],
    redes: [
      { _key: 'r1', plataforma: 'instagram', url: '#' },
      { _key: 'r2', plataforma: 'tiktok', url: '#' },
      { _key: 'r3', plataforma: 'youtube', url: '#' },
      { _key: 'r4', plataforma: 'pinterest', url: '#' },
    ],
    footerEnlaces: [
      { _key: 'f1', texto: 'FAQs', url: '#' },
      { _key: 'f2', texto: 'Shipping', url: '#' },
      { _key: 'f3', texto: 'Returns', url: '#' },
      { _key: 'f4', texto: 'Contact', url: '#' },
    ],
    footerClaim: "It's the little things!",
    footerMarca: 'by The Funky Factory',
  },
  {
    _id: 'carruselHero',
    _type: 'carruselHero',
    slides: [
      {
        _key: 's1',
        textoIzquierda: 'Awwww\nmakes\neverything\nbrighter.',
        kicker: 'Little characters.\nBig personalities.',
        ctaTexto: "Discover Awwy's", ctaEnlace: '#collection',
        textoDerecha: 'Small\nfigures.\nBrighter\nmoods.',
        personaje: { _type: 'reference', _ref: 'personaje-drizzle' },
      },
      {
        _key: 's2',
        textoIzquierda: 'Every drop\nhides a\ntiny smile.',
        kicker: 'Series 01.\nRainy days.',
        ctaTexto: 'Shop series 01', ctaEnlace: '#collection',
        textoDerecha: "Ten Awwy's.\nOne box.",
        personaje: { _type: 'reference', _ref: 'personaje-puddle' },
      },
      {
        _key: 's3',
        textoIzquierda: 'Who will\nyou get?',
        kicker: 'Blind box.\nBig surprise.',
        ctaTexto: 'Meet them all', ctaEnlace: '#characters',
        textoDerecha: 'Good things,\nsmall boxes.',
        personaje: { _type: 'reference', _ref: 'personaje-rainbow' },
      },
    ],
  },
  {
    _id: 'seccionPersonajes', _type: 'seccionPersonajes',
    titulo: "Meet the Awwy's",
    subtitulo: 'Each one has a story. Which one will you get?',
    enlaceTexto: 'View all', enlaceUrl: '#characters',
  },
  {
    _id: 'newsletter', _type: 'newsletter',
    titulo: 'Join the Awwy club',
    texto: 'Little news, early drops and a lot of good vibes. No spam, promise.',
    placeholder: 'your@email.com',
    ctaTexto: 'Sign me up',
    mensajeOk: "You're in! Welcome to the Awwy club ♡",
  },
  ...[
    ['Collect', 'Find your favourites'],
    ['Create', 'Different stories'],
    ['Be Awwy!', 'Spread good vibes'],
    ['A brighter tomorrow', 'Little things matter'],
  ].map(([titulo, subtitulo], i) => ({
    _id: `valor-${i + 1}`, _type: 'valor', orden: i + 1, titulo, subtitulo,
  })),
  ...[
    ['coleccion', 1, 'Rainy\ndays\ntoo!', 'Meet the collection', '#characters', 'personaje-umbrella'],
    ['coleccion', 2, null, null, null, null],
    ['coleccion', 3, 'Little\nmoments.\nBig joy.', null, null, 'personaje-puddle'],
    ['mundo', 1, 'Collect\nCreate\nBe Awwy!', 'Our world', '#about', 'personaje-waiting'],
    ['mundo', 2, null, 'Shop now', '#collection', null],
    ['mundo', 3, 'Good\nthings\ncome\nin small\nboxes.', null, null, null],
  ].map(([zona, orden, rotulo, ctaTexto, ctaEnlace, ref]) => ({
    _id: `panel-${zona}-${orden}`, _type: 'panel', zona, orden,
    ...(rotulo ? { rotulo } : {}),
    ...(orden === 2 && zona === 'mundo' ? { claim: 'A little\nhappier\neveryday.' } : {}),
    ...(ctaTexto ? { ctaTexto, ctaEnlace } : {}),
    ...(ref ? { personaje: { _type: 'reference', _ref: ref } } : {}),
  })),
  ...PERSONAJES.map(([numero, nombre, frase]) => ({
    _id: `personaje-${slug(nombre)}`,
    _type: 'personaje',
    numero, nombre, frase,
    slug: { _type: 'slug', current: slug(nombre) },
  })),
];

const tx = docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction());
await tx.commit();
console.log(`✔ ${docs.length} documentos creados o actualizados en ${SANITY_PROJECT_ID}/${SANITY_DATASET}`);
