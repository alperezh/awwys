import { defineField, defineType } from 'sanity';

/* Los bloques de imagen grande: la franja de colección y la de "our world".
 * El orden dentro de cada zona decide qué hueco de la web ocupa (1, 2 o 3). */
export default defineType({
  name: 'panel',
  title: 'Panel de imagen',
  type: 'document',
  fields: [
    defineField({
      name: 'zona', title: 'Zona', type: 'string',
      options: { list: [
        { title: 'Franja de colección (bajo los iconos)', value: 'coleccion' },
        { title: 'Franja "Our world" (bajo los personajes)', value: 'mundo' },
      ] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'orden', title: 'Posición (1 izquierda, 2 centro, 3 derecha)', type: 'number',
      validation: (r) => r.required().min(1).max(3),
    }),
    defineField({ name: 'fondo', title: 'Imagen de fondo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'figura', title: 'Figura o caja recortada', type: 'image',
      description: 'Se coloca encima del fondo. Si la dejas vacía se usa el personaje enlazado, o el dibujo.',
    }),
    defineField({ name: 'personaje', title: 'Personaje', type: 'reference', to: [{ type: 'personaje' }] }),
    defineField({ name: 'rotulo', title: 'Rótulo manuscrito', type: 'text', rows: 3 }),
    defineField({ name: 'claim', title: 'Claim en mayúsculas (panel rosa)', type: 'text', rows: 3 }),
    defineField({ name: 'ctaTexto', title: 'Texto del botón', type: 'string' }),
    defineField({ name: 'ctaEnlace', title: 'Enlace del botón', type: 'string' }),
    defineField({ name: 'altText', title: 'Texto alternativo', type: 'string' }),
  ],
  preview: {
    select: { zona: 'zona', orden: 'orden', rotulo: 'rotulo', media: 'fondo' },
    prepare: ({ zona, orden, rotulo, media }) => ({
      title: `${zona === 'mundo' ? 'Our world' : 'Colección'} · posición ${orden ?? '?'}`,
      subtitle: (rotulo || '').replace(/\n/g, ' '),
      media,
    }),
  },
});
