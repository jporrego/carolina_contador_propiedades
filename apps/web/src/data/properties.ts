import { querySanity } from '../lib/sanity';

export interface PropertyPhoto { url: string; alt: string; }
export interface Property {
  slug: string; title: string; type: string; location: string;
  price: number; currency: 'UF' | 'CLP'; operation: 'sale' | 'rent';
  status: 'available' | 'reserved'; featured: boolean;
  bedrooms: number; bathrooms: number; areaM2?: number; landAreaM2?: number;
  description: string; features: string[]; photos: PropertyPhoto[];
}
interface RawProperty extends Omit<Property, 'photos'> {
  photos: Array<{ url: string | null; alt: string; hotspot?: {x: number; y: number} }>;
}

export async function getProperties(): Promise<Property[]> {
  const rows = await querySanity<RawProperty[]>(`*[
    _type == "property" && !(_id in path("drafts.**")) &&
    status in ["available", "reserved"]
  ] | order(_createdAt desc) {
    "slug": slug.current, title, type, location, price, currency, operation,
    status, featured, bedrooms, bathrooms, areaM2, landAreaM2, description,
    "features": coalesce(features, []),
    "photos": photos[]{alt, hotspot, "url": asset->url}
  }`);
  const slugs = new Set<string>();
  return rows.map((row) => {
    if (!row.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug) || slugs.has(row.slug)) {
      throw new Error('Invalid or duplicate property slug: ' + row.slug);
    }
    slugs.add(row.slug);
    if (!row.title || !row.location || !row.description || !(row.price > 0) ||
        !['UF', 'CLP'].includes(row.currency) || !['sale', 'rent'].includes(row.operation)) {
      throw new Error('Incomplete published property: ' + row.slug);
    }
    const photos = (row.photos || []).map((photo) => {
      if (!photo.url || !photo.alt || !photo.url.startsWith('https://cdn.sanity.io/images/')) {
        throw new Error('Missing photo or description on property: ' + row.slug);
      }
      const url = new URL(photo.url);
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      if (photo.hotspot) {
        url.searchParams.set('crop', 'focalpoint');
        url.searchParams.set('fp-x', String(photo.hotspot.x));
        url.searchParams.set('fp-y', String(photo.hotspot.y));
      }
      return { url: url.toString(), alt: photo.alt };
    });
    if (!photos.length) throw new Error('Published property needs at least one photo: ' + row.slug);
    const names: Record<string, string> = { house: 'Casa', apartment: 'Departamento', land: 'Terreno', office: 'Oficina' };
    return { ...row, features: (row.features || []).filter((feature) => typeof feature === 'string' && feature.trim()).map((feature) => feature.trim()), type: names[row.type] || row.type, photos };
  });
}

export function photoUrl(photo: PropertyPhoto, width: number, ratio = 4 / 3) {
  const url = new URL(photo.url);
  url.searchParams.set('w', String(width));
  url.searchParams.set('h', String(Math.round(width / ratio)));
  return url.toString();
}
export const formatPrice = (property: Property) =>
  (property.currency === 'UF'
    ? 'UF ' + new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2 }).format(property.price)
    : new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(property.price))
  + (property.operation === 'rent' ? ' / mes' : '');
export const availability = (property: Property) =>
  property.status === 'reserved' ? 'Reservada' : property.operation === 'rent' ? 'En arriendo' : 'En venta';
