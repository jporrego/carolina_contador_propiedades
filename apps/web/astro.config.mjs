import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://carolinacontador.cl',
  output: 'static',
  trailingSlash: 'always',
});
