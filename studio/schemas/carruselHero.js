import { defineField, defineType } from 'sanity';

/* Carrusel de la portada: una imagen de fondo por slide. */
export default defineType({
  name: 'carruselHero',
  title: 'Carrusel de portada',
  type: 'document',
  fields: [
    defineField({
      name: 'slides', title: 'Slides', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'fondo', title: 'Imagen de fondo', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'fondoMovil', title: 'Imagen de fondo (móvil)', type: 'image', options: { hotspot: true } }),
          defineField({
            name: 'figura', title: 'Figura recortada (opcional)', type: 'image',
            description: 'Si la dejas vacía se usa la foto del personaje enlazado abajo.',
          }),
          defineField({ name: 'personaje', title: 'Personaje', type: 'reference', to: [{ type: 'personaje' }] }),
          defineField({ name: 'textoIzquierda', title: 'Rótulo izquierdo', type: 'text', rows: 3 }),
          defineField({ name: 'kicker', title: 'Texto pequeño', type: 'text', rows: 2 }),
          defineField({ name: 'ctaTexto', title: 'Texto del botón', type: 'string' }),
          defineField({ name: 'ctaEnlace', title: 'Enlace del botón', type: 'string' }),
          defineField({ name: 'textoDerecha', title: 'Rótulo derecho', type: 'text', rows: 3 }),
          defineField({ name: 'altText', title: 'Texto alternativo', type: 'string' }),
        ],
        preview: {
          select: { title: 'textoIzquierda', media: 'fondo' },
          prepare: ({ title, media }) => ({ title: (title || 'Slide').replace(/\n/g, ' '), media }),
        },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Carrusel de portada' }) },
});
