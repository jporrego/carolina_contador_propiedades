# SEO readiness and domain launch

## Implemented
- Static Spanish HTML, descriptive unique metadata, one H1 per page, crawlable property links and responsive photographs with alt text.
- Canonicals and social URLs derive from SITE_URL. Shared listings use their own 1200 × 630 cover; other pages use the optimized interior image.
- JSON-LD: Person with real contact details, WebSite, WebPage/CollectionPage/RealEstateListing, catalogue ItemList and visible breadcrumb hierarchy. CMS strings are escaped for script safety.
- Sitemap contains only the homepage, catalogue and currently published available/reserved listings. Comparison and 404 pages remain noindex even at launch.
- SITE_INDEXABLE defaults to false; non-main Cloudflare branches remain noindex. robots.txt permits crawling so crawlers can read noindex.
- No invented credentials, service areas, reviews, addresses or ratings. Person markup is used until verified business details support LocalBusiness markup. Structured data does not guarantee rich results or rankings.

## Required before indexing
1. Confirm Carolina's service cities/comunas and add them naturally to the homepage copy and metadata. Confirm experience/credentials before adding them. Avoid duplicate city pages with swapped place names.
2. Replace the current test listing (Casa 01 and its unrelated photograph) with genuine approved property content or unpublish it. Use descriptive titles, useful original descriptions, accurate availability, and property-specific photos/alt text. Never use an unrelated stock photo as evidence of a listed property.
3. Choose the primary domain and www preference. Attach it to this Cloudflare Pages project, set SITE_URL to its HTTPS origin, and redirect the alternate host and pages.dev host to the primary with path/query preservation. Do not touch colormural.cl.
4. Set SITE_INDEXABLE=true only for production after approval, rebuild and deploy. Keep preview environments false. Check actual response HTML: production indexable, comparison/404/preview noindex. Verify robots.txt and sitemap URLs use the final domain and unavailable URLs return HTTP 404.
5. Verify the domain in Google Search Console, submit /sitemap.xml, inspect homepage/catalogue/a property URL and run Google's Rich Results Test for breadcrumbs. Check Schema.org validation separately for general listing markup (not a promise of a Google property rich result).
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
