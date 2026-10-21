# Cloudflare Pages

Only the Carolina project is in scope. Do not modify colormural.cl or its settings.

- Repository: jporrego/carolina_contador_propiedades
- Production branch: main
- Root: repository root (leave blank)
- Build command: pnpm build
- Output: apps/web/dist
- NODE_VERSION=24
- PNPM_VERSION=11.25.0
- SANITY_PROJECT_ID=vzzp5544
- SANITY_DATASET=production
- SITE_URL=https://carolina-contador-propiedades.pages.dev
- SITE_INDEXABLE=false until real contact details and launch content are approved. Set true for launch.

SEO includes canonical URLs, social metadata, sitemap.xml, robots.txt and a real 404 page.
Preview branches remain noindex. Noindex does not make the website private.

## Automatic content builds
Create a Pages deploy hook for main. In Sanity project API > Webhooks, add its URL:
- dataset: production
- method: POST
- events: create, update, delete
- drafts: disabled
- filter: _type in ["property", "homepage"] && !(_id in path("drafts.**"))

The hook URL authorizes triggering builds. Store it in Sanity, not this repository.
Publishing or unpublishing requires a successful new deployment to update the static website.

## Deployment verified
Live URL: https://carolina-contador-propiedades.pages.dev
Cloudflare project: carolina-contador-propiedades. Git pushes to main deploy automatically.
Sanity webhook: Cloudflare Pages — Carolina; enabled for production, published property/homepage creates, updates and deletes. Drafts and versions disabled. Hook URL is stored only in provider settings.
Verified live homepage, catalogue, property carousel/expanded viewer, sitemap, robots, canonical/noindex and HTTP 404. Sanity delivery on a subsequent publish remains to be observed.
colormural.cl was not modified.

