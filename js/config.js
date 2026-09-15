/* Awwy's · configuración pública del front.
 *
 * projectId y dataset NO son secretos: son identificadores públicos de la API
 * de lectura por CDN de Sanity (cualquiera los ve en las peticiones del
 * navegador). Los tokens de ESCRITURA nunca van aquí.
 *
 * Mientras projectId esté vacío, la web usa el contenido de respaldo del HTML
 * (los personajes dibujados en SVG y los fondos de degradado), así que nunca
 * se ve rota.
 */
window.AWWYS = {
  sanity: {
    projectId: '',            // <-- pega aquí el Project ID de Sanity
    dataset: 'production',
    apiVersion: '2024-01-01',
  },
};
