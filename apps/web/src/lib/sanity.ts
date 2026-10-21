const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';

export async function querySanity<T>(query: string): Promise<T> {
  if (!projectId || !/^[a-z0-9]+$/.test(projectId) || !/^[a-z0-9_-]+$/.test(dataset)) {
    throw new Error('Configure SANITY_PROJECT_ID and SANITY_DATASET in apps/web/.env.local.');
  }
  const url = new URL('https://' + projectId + '.api.sanity.io/v2026-10-21/data/query/' + dataset);
  url.searchParams.set('query', query);
  url.searchParams.set('perspective', 'published');
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('Sanity content request failed: ' + response.status);
  const body = await response.json();
  if (body.error || !('result' in body)) throw new Error('Invalid Sanity response');
  return body.result as T;
}
