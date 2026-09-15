import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { estructura } from './structure';

export default defineConfig({
  name: 'awwys',
  title: "Awwy's",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({ structure: estructura }), visionTool()],
  schema: { types: schemaTypes },
});
