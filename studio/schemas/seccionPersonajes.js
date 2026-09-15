import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seccionPersonajes',
  title: 'Sección "Meet the Awwy\'s"',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Título', type: 'string' }),
    defineField({ name: 'subtitulo', title: 'Subtítulo', type: 'string' }),
    defineField({ name: 'enlaceTexto', title: 'Texto del enlace', type: 'string' }),
    defineField({ name: 'enlaceUrl', title: 'URL del enlace', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: "Sección Meet the Awwy's" }) },
});
