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
- Production SITE_INDEXABLE=true (authorized 2026-10-22). Keep local/example/preview environments noindex.

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
## Propagation recovery — 2026-10-22
- Confirmed independently over DNS-over-HTTPS: Google resolves apex to Cloudflare (104.21.92.246 / 172.67.200.252, erin/nolan nameservers), while Cloudflare's public resolver still returns Dynadot parking (185.53.179.149, ns1/ns2.dyna-ns.net). Public access is therefore inconsistent despite Pages Active/SSL status.
- Disabled only the `Carolina primary domain` Bulk Redirect Rule so the pages.dev host remains a working fallback. List/configuration retained for re-enabling after normal custom-domain HTTPS works consistently. www-to-apex rule remains enabled.
- Verified HTTPS 200 and the homepage directly at https://carolina-contador-propiedades.pages.dev/?preview=1 . The query avoids a previously cached permanent redirect.
- Keep SITE_URL=https://carolinacontador.cl and SITE_INDEXABLE=false. Next check: normal custom-domain HTTPS plus both public resolver results; re-enable the Carolina bulk redirect only after these pass. Do not bypass certificate errors or change unrelated domain settings.

## Normal public access verified — 2026-10-22
- Normal HTTPS requests now return 200 on carolinacontador.cl without DNS overrides. www redirects to the apex and preserves paths/query strings. Canonicals, sitemap and robots use the final domain.
- Re-enabled only `Carolina primary domain` Bulk Redirect Rule after public HTTPS succeeded; pages.dev now forwards to the primary domain again.
- Current catalogue is empty (the previous test listing is unpublished). Homepage contact spacing now also handles services immediately followed by contact when featured listings are absent.
- Search indexing remains disabled. Next launch tasks: approve public copy, enable production indexing, verify Search Console and submit the sitemap; eligible Google Business Profile setup is separate.

## Search indexing launch — 2026-10-22
- User authorized enabling production indexing and Google Search Console setup.
- Production SITE_INDEXABLE=true saved in Cloudflare. A new deployment is required for generated HTML to reflect the variable.
- Production-mode build and SEO output checks pass, including noindex on comparison and 404 pages. Non-main branches retain the existing preview guard.
- Google Search Console Domain property carolinacontador.cl verified under the existing jporregoc@gmail.com account with a DNS TXT record. Keep the Google verification record in DNS.
- Search Console URL: https://search.google.com/search-console?resource_id=sc-domain%3Acarolinacontador.cl
- Sitemap: https://carolinacontador.cl/sitemap.xml