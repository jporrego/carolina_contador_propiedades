import { defineField, defineType } from 'sanity';

export const homepage = defineType({
  name: 'homepage', title: 'Página de inicio', type: 'document',
  fields: [
    defineField({ name: 'heroLine1', title: 'Título principal · Primera línea', type: 'string', validation: (R) => R.max(70) }),
    defineField({ name: 'heroLine2', title: 'Título principal · Segunda línea', type: 'string', validation: (R) => R.max(70) }),
    defineField({ name: 'heroDescription', title: 'Texto de presentación', type: 'text', rows: 3 }),
    defineField({ name: 'aboutTitle', title: 'Título de Sobre mí', type: 'text', rows: 3 }),
    defineField({ name: 'aboutParagraph1', title: 'Sobre mí · Primer párrafo', type: 'text', rows: 5 }),
    defineField({ name: 'aboutParagraph2', title: 'Sobre mí · Segundo párrafo', type: 'text', rows: 5 }),
  ],
  preview: { prepare: () => ({ title: 'Página de inicio' }) },
});
