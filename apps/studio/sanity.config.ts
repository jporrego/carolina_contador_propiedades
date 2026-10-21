import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { property } from './schemaTypes/property';
import { homepage } from './schemaTypes/homepage';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
if (!projectId) {
  throw new Error('Falta SANITY_STUDIO_PROJECT_ID. Copia .env.example a .env.local y configura tu proyecto de Sanity.');
}

export default defineConfig({
  name: 'carolina',
  title: 'Carolina Contador · Propiedades',
  projectId,
  dataset,
  plugins: [
    structureTool({
      title: 'Propiedades',
      structure: (S) => S.list().title('Gestionar propiedades').items([
        S.listItem().title('Página de inicio').child(S.document().schemaType('homepage').documentId('homepage')),
        S.documentTypeListItem('property').title('Todas las propiedades'),
        S.divider(),
        ...[
          ['available', 'Disponibles'],
          ['reserved', 'Reservadas'],
          ['sold', 'Vendidas'],
          ['rented', 'Arrendadas'],
          ['archived', 'Archivadas'],
        ].map(([status, title]) => S.listItem().title(title).child(
          S.documentList().title(title).schemaType('property').apiVersion('2026-10-21')
            .filter('_type == "property" && status == $status').params({ status }),
        )),
      ]),
    }),
  ],
  schema: { types: [property, homepage], templates: (templates) => templates.filter((template) => template.schemaType !== 'homepage') },
  document: { actions: (actions, context) => context.schemaType === 'homepage' ? actions.filter((action) => action.action !== 'duplicate') : actions },
});
