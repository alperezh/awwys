import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'configuracionSitio',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    defineField({ name: 'tituloSEO', title: 'Título (pestaña y buscadores)', type: 'string' }),
    defineField({ name: 'descripcionSEO', title: 'Descripción SEO', type: 'text', rows: 2 }),
    defineField({ name: 'themeColor', title: 'Color de tema', type: 'string' }),
    defineField({ name: 'logo', title: 'Logotipo', type: 'image',
      description: 'PNG o SVG con fondo transparente. Sustituye al logo de texto.' }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image' }),
    defineField({
      name: 'menuPrincipal', title: 'Menú principal', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'texto', type: 'string', title: 'Texto' }),
        defineField({ name: 'url', type: 'string', title: 'URL' }),
      ] }],
    }),
    defineField({
      name: 'redes', title: 'Redes sociales', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'plataforma', type: 'string', title: 'Plataforma',
          options: { list: ['instagram', 'tiktok', 'youtube', 'pinterest'] } }),
        defineField({ name: 'url', type: 'string', title: 'URL' }),
      ] }],
    }),
    defineField({
      name: 'footerEnlaces', title: 'Enlaces del pie', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'texto', type: 'string', title: 'Texto' }),
        defineField({ name: 'url', type: 'string', title: 'URL' }),
      ] }],
    }),
    defineField({ name: 'footerClaim', title: 'Claim del pie', type: 'string' }),
    defineField({ name: 'footerMarca', title: 'Línea de marca', type: 'string' }),
    defineField({ name: 'footerLegal', title: 'Aviso legal', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Configuración del sitio' }) },
});
