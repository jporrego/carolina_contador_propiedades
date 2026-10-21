import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../src/data/properties.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function load(rows) {
  const exports = {};
  new Function('require', 'exports', compiled)(() => ({
    querySanity: async (query) => {
      assert.ok(query.includes('status in ["available", "reserved"]'));
      assert.match(query, /drafts/);
      return rows;
    },
  }), exports);
  return exports;
}
const property = {
  slug: 'casa-con-jardin', title: 'Casa con jardín', type: 'house',
  location: 'Santiago', price: 5000.5, currency: 'UF', operation: 'sale',
  status: 'available', featured: true, bedrooms: 3, bathrooms: 2,
  description: 'Una casa con jardín.', features: [],
  photos: [{url: 'https://cdn.sanity.io/images/vzzp5544/production/test-1000x800.jpg', alt: 'Jardín', hotspot: {x: 0.3, y: 0.6}}],
};
test('published data maps prices, ordered photographs and focal points', async () => {
  const api = load([property]);
  const [result] = await api.getProperties();
  assert.equal(result.type, 'Casa');
  assert.equal(api.formatPrice(result), 'UF 5.000,5');
  assert.equal(api.formatPrice({...result, currency: 'CLP', operation: 'rent', price: 800000}), '$800.000 / mes');
  assert.equal(api.availability({...result, status: 'reserved'}), 'Reservada');
  assert.match(api.photoUrl(result.photos[0], 640), /fp-x=0.3/);
  assert.match(api.photoUrl(result.photos[0], 640), /w=640/);
});
test('empty data stays empty instead of exposing old fixtures', async () => {
  assert.deepEqual(await load([]).getProperties(), []);
});
test('duplicate slugs or incomplete published photos fail loudly', async () => {
  await assert.rejects(load([property, property]).getProperties(), /duplicate/);
  await assert.rejects(load([{...property, photos: []}]).getProperties(), /photo/);
});
