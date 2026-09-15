import { defineField, defineType } from 'sanity';

/* La franja de cuatro iconos bajo el carrusel. */
export default defineType({
  name: 'valor',
  title: 'Valor (franja de iconos)',
  type: 'document',
  fields: [
    defineField({ name: 'orden', title: 'Orden', type: 'number', validation: (r) => r.required() }),
    defineField({ name: 'titulo', title: 'Título', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subtitulo', title: 'Subtítulo', type: 'string' }),
    defineField({
      name: 'icono', title: 'Icono', type: 'image',
      description: 'SVG o PNG con fondo transparente. Si lo dejas vacío se usa el icono dibujado.',
    }),
  ],
  orderings: [{ title: 'Por orden', name: 'ordenAsc', by: [{ field: 'orden', direction: 'asc' }] }],
  preview: { select: { title: 'titulo', subtitle: 'subtitulo', media: 'icono' } },
});
