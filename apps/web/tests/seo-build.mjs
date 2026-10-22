import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('apps/web/dist');
const mode = process.argv[2] || 'noindex';
const origin = process.argv[3] || 'https://carolina-contador-propiedades.pages.dev';
function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)]); }
const titles = new Set();
let pages = 0;
for (const file of files(root).filter(p => p.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  const path = '/' + file.slice(root.length + 1).replaceAll('\\', '/').replace(/index\.html$/, '');
  const excluded = path === '/404.html' || path.startsWith('/comparar-contacto/');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title && !titles.has(title), 'Unique title: ' + path); titles.add(title);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, 'One H1: ' + path);
  assert.match(html, /<html[^>]+lang="es"/);
  assert.match(html, /name="description" content="[^"]+"/);
  assert.ok(html.includes('rel="canonical" href="' + origin + (path === '/404.html' ? '/404/' : path) + '"'), 'Canonical: ' + path);
  const robots = html.match(/name="robots" content="([^"]+)"/)?.[1];
  assert.equal(robots?.includes('noindex'), excluded || mode !== 'index', 'Index policy: ' + path);
  const image = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(image?.startsWith('https://'), 'Absolute social image: ' + path);
  if (image.startsWith(origin)) assert.ok(existsSync(join(root, new URL(image).pathname)));
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
  if (!excluded) {
    assert.equal(graphs.length, 1);
    const graph = graphs[0]['@graph'];
    assert.ok(graph.some(n => n['@type'] === 'WebSite'));
    assert.ok(graph.some(n => n['@type'] === 'Person' && n.email === 'carolina.c@signaturegi.cl'));
    if (path.startsWith('/propiedades/')) assert.ok(graph.some(n => n['@type'] === 'BreadcrumbList'));
  }
  for (const match of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const target = match[1];
    assert.ok(existsSync(join(root, target.endsWith('/') ? target + 'index.html' : target)), 'Internal link: ' + target);
  }
  pages++;
}
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
assert.ok(!sitemap.includes('comparar-contacto') && !sitemap.includes('404'));
for (const m of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
  assert.ok(m[1].startsWith(origin + '/'));
  assert.ok(existsSync(join(root, new URL(m[1]).pathname, 'index.html')));
}
assert.ok(readFileSync(join(root, 'robots.txt'), 'utf8').includes('Sitemap: ' + origin + '/sitemap.xml'));
console.log(`SEO checks passed: ${pages} pages, ${mode} policy, metadata, JSON-LD, social images, internal links and sitemap.`);
