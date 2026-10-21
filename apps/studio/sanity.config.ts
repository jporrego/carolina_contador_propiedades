import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { property } from './schemaTypes/property';

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
        S.documentTypeListItem('property').title('Todas las propiedades'),
        S.divider(),
        ...[
          ['available', 'Disponibles'],
          ['reserved', 'Reservadas'],
          ['sold', 'Vendidas'],
          ['rented', 'Arrendadas'],
          ['archived', 'Archivadas'],
        ].map(([status, title]) => S.listItem().title(title).child(
          S.documentList().title(title).schemaType('property')
            .filter('_type == "property" && status == $status').params({ status }),
        )),
      ]),
    }),
  ],
  schema: { types: [property] },
});
