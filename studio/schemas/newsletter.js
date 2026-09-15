import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'newsletter',
  title: 'Newsletter',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Título', type: 'string' }),
    defineField({ name: 'texto', title: 'Texto', type: 'text', rows: 2 }),
    defineField({ name: 'placeholder', title: 'Placeholder del email', type: 'string' }),
    defineField({ name: 'ctaTexto', title: 'Texto del botón', type: 'string' }),
    defineField({ name: 'mensajeOk', title: 'Mensaje de confirmación', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Newsletter' }) },
});
