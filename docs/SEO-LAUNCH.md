# SEO readiness and domain launch

## Implemented
- Static Spanish HTML, descriptive unique metadata, one H1 per page, crawlable property links and responsive photographs with alt text.
- Canonicals and social URLs derive from SITE_URL. Shared listings use their own 1200 × 630 cover; other pages use the optimized interior image.
- JSON-LD: Person with real contact details, WebSite, WebPage/CollectionPage/RealEstateListing, catalogue ItemList and visible breadcrumb hierarchy. CMS strings are escaped for script safety.
- Sitemap contains only the homepage, catalogue and currently published available/reserved listings. Comparison and 404 pages remain noindex even at launch.
- SITE_INDEXABLE defaults to false; non-main Cloudflare branches remain noindex. robots.txt permits crawling so crawlers can read noindex.
- No invented credentials, service areas, reviews, addresses or ratings. Person markup is used until verified business details support LocalBusiness markup. Structured data does not guarantee rich results or rankings.

## Launch status and ongoing work
1. Confirmed priority market: Santiago, especially Ñuñoa, La Reina, Providencia, Las Condes, Vitacura and Lo Barnechea. The homepage title and description target Santiago. The priority comuna list is retained here for planning; the introduction intentionally avoids listing areas. Confirm experience/credentials before adding them. Avoid duplicate city pages with swapped place names.
2. The previous test listing is no longer shown; the catalogue is currently empty. Add approved real listings as they become available, with accurate availability, useful original descriptions, and property-specific photos/alt text.
3. Primary domain is https://carolinacontador.cl. Apex/www are active in Pages, SITE_URL is updated, and www/production pages.dev redirects preserve paths and queries. Normal browser HTTPS and redirects have been verified. colormural.cl is outside scope.
4. Public indexing authorized and deployed on 2026-10-22. Homepage and catalogue serve index/follow metadata. Comparison remains noindex; missing URLs return HTTP 404 and noindex. Cloudflare deployment preview URL verified with X-Robots-Tag: noindex. Production build checks pass.
5. Domain ownership verified in Google Search Console on 2026-10-22 using a DNS TXT record. Keep that record in Cloudflare. Sitemap submitted and processed with Success; homepage indexing requested and accepted into Google's priority crawl queue. The homepage is discovered, not yet indexed. Inspect future real property URLs and use Google's Rich Results Test for breadcrumbs. Check Schema.org validation separately for general listing markup (not a promise of a Google property rich result).
6. Run PageSpeed Insights mobile on the final hosted pages; review LCP, CLS and INP. Real-user Core Web Vitals need traffic and time. Inspect Search Console indexing and performance after launch.
7. Create/verify an eligible Google Business Profile using the real business identity and service area; don't invent a public office address. Keep phone/name consistent and request genuine client reviews.

## Maintenance
Publishing Sanity content triggers a static rebuild. Check webhook delivery and successful deployment after publishing. Removed/sold/rented listings currently disappear and return 404 after a rebuild; only add a permanent redirect when a genuinely equivalent replacement exists. Preserve property slugs where possible; record redirects if a public slug changes. Keep availability current.

## References
- https://developers.google.com/search/docs/fundamentals/get-started-developers
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://schema.org/RealEstateListing

## Repeatable checks (from repository root)
Run `pnpm check`, `pnpm build`, `pnpm --filter @carolina/web test`, then `node apps/web/tests/seo-build.mjs noindex` for staging. For an indexable production build use `node apps/web/tests/seo-build.mjs index https://YOUR-DOMAIN` (replace with the actual SITE_URL, no trailing slash). The checker validates generated metadata, JSON-LD parsing, links, image assets, sitemap and indexing rules. It does not replace Google's live URL Inspection or field performance data.
