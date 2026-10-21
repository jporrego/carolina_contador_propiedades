# Carolina Contador Cortes — Propiedades

Spanish-language website prioritizing property owners who want to hire Carolina. Property listings are secondary.

## Development

Use Node.js 24 LTS and pnpm 11 (the exact pnpm version is pinned in package.json).

    pnpm install
    pnpm dev

Astro serves the website at http://localhost:4321.

    pnpm check
    pnpm build
    pnpm preview

## Structure

- apps/web — Astro static website, strict TypeScript.
- apps/web/src/config/site.ts — shared identity and metadata.
- apps/web/src/layouts — document shell and shared page layout.
- apps/web/src/components — reusable components added as needed.
- apps/web/src/styles/global.css — palette, typography, spacing, and base styles.
- apps/studio — reserved for Sanity Studio in step 5.
- docs/PLAN.md — agreed incremental scope.

Step 1 provides a basic Spanish page, not the finished homepage. Copy is provisional.
The final domain, canonical URLs, sitemap, Sanity integration, and Cloudflare deployment will be configured in later steps.
The static build output is apps/web/dist. No server adapter is required.

## Contact configuration
Edit apps/web/src/config/contact.ts. Replace the sample phone and email, use international digits only for whatsappNumber (no + or spaces), and set isPlaceholder to false to activate links.

## Sample listings
Typed sample data lives in apps/web/src/data/properties.ts. The catalogue and all detail routes are generated statically and marked noindex while they contain examples. Replace the fixtures with Sanity in step 6 before enabling indexing. No exact addresses or real availability are asserted.

## Sanity Studio
See apps/studio/README.md for account setup. Commands: pnpm studio, pnpm studio:check and pnpm studio:build. The editor runs separately from Astro.

## Published content (step 6)

Copy apps/web/.env.example to apps/web/.env.local before starting Astro.
The public project ID and dataset do not require API tokens. Set the same SANITY_PROJECT_ID and SANITY_DATASET variables in Cloudflare at deployment.

The website reads the published perspective of Sanity:
- Catalogue and detail routes: available and reserved properties only.
- Homepage: up to two featured available properties.
- Drafts, unpublished, archived, sold and rented properties are excluded.
- No published listings means a normal empty catalogue, not fallback fixture listings.
- Network/API errors fail the build, preserving the previous deployment instead of silently publishing an empty site.
- Ordered photographs use the first image as cover. Sanity CDN serves responsive formats and focal-point crops.
- Página de inicio edits the hero and biography. Empty fields use the existing copy.
- Services, process, contact details and hero photography remain in local code.
- This is static rendering: after publishing content, rebuild with pnpm build (or restart pnpm dev for local route changes). Automatic publish hooks are step 7.
- Property pages remain noindex until launch review in step 7.

To check the flow: publish a property with required fields and a photo, run pnpm build, then pnpm preview. Toggle its featured/status fields, republish and rebuild. Unpublishing removes the route on the next build. Do not add secrets to the public dataset.
