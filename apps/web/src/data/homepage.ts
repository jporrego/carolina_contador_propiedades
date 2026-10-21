import { querySanity } from '../lib/sanity';

const defaults = {
  heroLine1: 'Tu propiedad,',
  heroLine2: 'en buenas manos.',
  heroDescription: 'Vender es una gran decisión. Demos el siguiente paso juntos.',
  aboutTitle: 'Detrás de cada propiedad, hay una historia. Me gustaría conocer la tuya.',
  aboutParagraph1: 'Soy Carolina Contador Cortes. Quiero acompañarte en una decisión importante: vender tu propiedad y abrir la puerta a lo que viene.',
  aboutParagraph2: 'Mi propuesta comienza por escucharte, entender lo que necesitas y dar a tu propiedad una presentación cuidada. Con cercanía, claridad y atención a cada detalle.',
};

export async function getHomepage() {
  const content = await querySanity<Partial<typeof defaults> | null>(
    '*[_type == "homepage" && _id == "homepage"][0]{heroLine1, heroLine2, heroDescription, aboutTitle, aboutParagraph1, aboutParagraph2}',
  );
  return Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => [
    key, content?.[key as keyof typeof defaults]?.trim() || fallback,
  ])) as typeof defaults;
}
