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
- SITE_URL=https://carolinacontador.cl
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

Hosted CMS: https://carolina-contador.sanity.studio/ . Sanity app ID eqeg3rrwpvpqfo4a1hz16ymg. Hosted workspace verified; Editor invitation sent. Studio deployments use pnpm studio:deploy.

## Custom domain — 2026-10-22
- Purchased primary domain: https://carolinacontador.cl (Dynadot registrar).
- Cloudflare zone created on Free: 71dff45075ea8b3e2a9d5852cdd3b7e8.
- Dynadot nameservers saved for carolinacontador.cl only: erin.ns.cloudflare.com and nolan.ns.cloudflare.com.
- Initial domain was parked; Cloudflare scan found zero existing records.
- Status: awaiting public DNS delegation/Cloudflare activation. Public NS lookup still returned NXDOMAIN at setup time.
- Pages association is pending zone activation; no claim that the custom domain serves the website yet.
- After activation: add carolinacontador.cl and www.carolinacontador.cl to the Carolina Pages project, verify HTTPS, redirect www and the production pages.dev host to the apex, set production SITE_URL=https://carolinacontador.cl, then rebuild and verify canonical/social/sitemap URLs.
- SITE_INDEXABLE stays false pending real listing/content launch approval. Do not enable indexing simply because the domain resolves.
- No settings for colormural.cl were changed.

## Custom domain activation completed — 2026-10-22
- Both carolinacontador.cl and www.carolinacontador.cl are Active with SSL enabled in Pages.
- Both DNS records are proxied CNAMEs to carolina-contador-propiedades.pages.dev.
- Production SITE_URL is https://carolinacontador.cl; source defaults, example environment and build checks use that origin.
- Single Redirect `Carolina — www to primary domain`: exact hostname www.carolinacontador.cl, dynamic target concat("https://carolinacontador.cl", http.request.uri.path), 301, query preservation enabled.
- Bulk Redirect List `carolina_primary_domain` and Rule `Carolina primary domain` redirect only the production pages.dev hostname to the apex with 301, query/subpath/path-suffix preservation. Include subdomains is false so preview hostnames keep working.
- Verified HTTPS 200 and homepage canonical/noindex at Cloudflare using authoritative DNS with normal certificate verification. Verified both redirects preserve /propiedades/?test=domain.
- Local recursive/browser DNS caches still had stale parking/negative answers at verification time. Normal browser access needs a final recheck after these caches expire; do not bypass certificate warnings.
- SITE_INDEXABLE remains false. colormural's domain, project and existing redirect were not modified.