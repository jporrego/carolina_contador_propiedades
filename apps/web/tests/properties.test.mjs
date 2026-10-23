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
test('photos without descriptions publish with a property-based fallback', async () => {
  const descriptions = [undefined, null, '', '  ', '  Living con jardín  '];
  const [result] = await load([{
    ...property,
    photos: descriptions.map((alt) => ({...property.photos[0], alt})),
  }]).getProperties();
  assert.deepEqual(result.photos.map((photo) => photo.alt), [
    'Casa con jardín — fotografía 1',
    'Casa con jardín — fotografía 2',
    'Casa con jardín — fotografía 3',
    'Casa con jardín — fotografía 4',
    'Living con jardín',
  ]);
});
test('duplicate slugs or incomplete published photos fail loudly', async () => {
  await assert.rejects(load([property, property]).getProperties(), /duplicate/);
  await assert.rejects(load([{...property, photos: []}]).getProperties(), /photo/);
  await assert.rejects(load([{...property, photos: [{url: null}]}]).getProperties(), /photo/);
  await assert.rejects(load([{...property, photos: [{url: 'https://other.example/photo.jpg'}]}]).getProperties(), /photo/);
});
