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
