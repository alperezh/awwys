/* Orden del menú del Studio: los documentos únicos (singletons) arriba,
 * las colecciones abajo. */
export const estructura = (S) =>
  S.list()
    .title("Awwy's")
    .items([
      S.listItem().title('Configuración del sitio').id('configuracionSitio')
        .child(S.document().schemaType('configuracionSitio').documentId('configuracionSitio')),
      S.listItem().title('Carrusel de portada').id('carruselHero')
        .child(S.document().schemaType('carruselHero').documentId('carruselHero')),
      S.listItem().title("Sección Meet the Awwy's").id('seccionPersonajes')
        .child(S.document().schemaType('seccionPersonajes').documentId('seccionPersonajes')),
      S.listItem().title('Newsletter').id('newsletter')
        .child(S.document().schemaType('newsletter').documentId('newsletter')),
      S.divider(),
      S.documentTypeListItem('personaje').title('Personajes'),
      S.documentTypeListItem('panel').title('Paneles de imagen'),
      S.documentTypeListItem('valor').title('Franja de iconos'),
    ]);
