import { defineField, defineType } from 'sanity';

/* Cada uno de los Awwy's. La imagen sustituye al dibujo SVG de respaldo. */
export default defineType({
  name: 'personaje',
  title: 'Personaje',
  type: 'document',
  fields: [
    defineField({ name: 'numero', title: 'Número', type: 'number', validation: (r) => r.required().min(1) }),
    defineField({ name: 'nombre', title: 'Nombre', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'Slug (URL de su ficha)', type: 'slug',
      options: { source: 'nombre', maxLength: 60 },
    }),
    defineField({
      name: 'frase', title: 'Frase', type: 'text', rows: 2,
      description: 'La que aparece bajo el nombre. Un salto de línea = un <br>.',
    }),
    defineField({
      name: 'imagen', title: 'Foto de la figura', type: 'image',
      options: { hotspot: true },
      description: 'PNG con fondo transparente, recortado. Mientras no la subas, se usa el dibujo.',
    }),
    defineField({ name: 'descripcion', title: 'Descripción larga', type: 'text', rows: 4 }),
  ],
  orderings: [{ title: 'Por número', name: 'numeroAsc', by: [{ field: 'numero', direction: 'asc' }] }],
  preview: {
    select: { title: 'nombre', subtitle: 'frase', media: 'imagen', numero: 'numero' },
    prepare: ({ title, subtitle, media, numero }) => ({
      title: `${String(numero ?? '').padStart(2, '0')} ${title || ''}`,
      subtitle: (subtitle || '').replace(/\n/g, ' '),
      media,
    }),
  },
});
