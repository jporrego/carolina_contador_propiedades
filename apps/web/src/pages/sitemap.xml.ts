import type { APIRoute } from 'astro';
import { getProperties } from '../data/properties';
export const GET: APIRoute = async ({ site }) => {
  const paths = ['/', '/propiedades/', ...(await getProperties()).map((p) => '/propiedades/' + p.slug + '/')];
  const escape = (text: string) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const xml = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    paths.map((path) => '<url><loc>' + escape(new URL(path, site).href) + '</loc></url>').join('') + '</urlset>';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
