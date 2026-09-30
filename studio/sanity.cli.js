import { defineCliConfig } from 'sanity/cli';

/* El Project ID no es secreto (es el identificador público de la API), así que
 * va escrito aquí: la CLI evalúa este fichero antes de cargar el .env, y sin él
 * `sanity deploy` falla. La variable de entorno, si existe, manda. */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '3fsn8pd0';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineCliConfig({
  api: { projectId, dataset },
  /** Nombre del Studio alojado → https://awwys.sanity.studio */
  studioHost: 'awwys',
});
