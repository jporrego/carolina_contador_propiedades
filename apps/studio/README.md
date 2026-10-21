# Sanity Studio — listing editor

## Connect your account

1. Sign in at https://www.sanity.io/manage and create a project named Carolina Contador Propiedades.
2. Create a public dataset named production. Store only public property information here.
3. Copy .env.example to .env.local in apps/studio, and fill SANITY_STUDIO_PROJECT_ID with the ID from project settings.
4. From the repository root run pnpm studio and sign in to your Sanity account at http://localhost:3333.
5. If prompted for CORS, add http://localhost:3333 to the project's API CORS origins with credentials enabled.

No API token is needed in the browser. Never put private API tokens in SANITY_STUDIO_* variables.

## Daily editing

- Open Todas las propiedades and create a Propiedad.
- Fill the required fields and generate the URL from the title.
- Add photographs with image descriptions; drag to reorder. The first photo is the cover.
- Sanity saves drafts automatically. Publish when ready; unpublish to withdraw published content.
- Disponibilidad is commercial status, independent of draft/published state.
- Use the filtered lists for available, reserved, sold, rented and archived properties.
- Destacar en la página de inicio records the editorial choice for step 6.

## Commands

- pnpm studio:check — TypeScript validation (no project required).
- pnpm studio:build — production bundle (project environment required).
- pnpm studio — local editor.

## Current scope

The editor is configured but needs your real Sanity project before sign-in, uploads and publishing can be verified.
The website still reads local fixture data. Connecting published content and applying status/featured filters is step 6.
Public example labels have been removed for design review; fixture status stays documented here, and property pages remain noindex until launch.
