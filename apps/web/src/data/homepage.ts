import { querySanity } from '../lib/sanity';

const defaults = {
  heroLine1: 'Tu propiedad,',
  heroLine2: 'en buenas manos.',
  heroDescription: 'Gestión cercana para vender tu propiedad.',
  aboutTitle: 'Asesoría inmobiliaria, de principio a fin.',
  aboutParagraph1: 'Soy Carolina. Te acompaño en la venta de tu propiedad, desde su presentación hasta el cierre, con una gestión clara y personal.',
  aboutParagraph2: '',
};

export async function getHomepage() {
  const content = await querySanity<Partial<typeof defaults> | null>(
    '*[_type == "homepage" && _id == "homepage"][0]{heroLine1, heroLine2, heroDescription, aboutTitle, aboutParagraph1, aboutParagraph2}',
  );
  return Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => [
    key, content?.[key as keyof typeof defaults]?.trim() || fallback,
  ])) as typeof defaults;
}
