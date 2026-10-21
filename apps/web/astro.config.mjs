import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://carolina-contador-propiedades.pages.dev',
  output: 'static',
  trailingSlash: 'always',
});
