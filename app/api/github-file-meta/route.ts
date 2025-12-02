import { NextResponse } from 'next/server';
import { getGitHubHeaders, readCache, writeCache } from '@/lib/github';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const owner = url.searchParams.get('owner');
    const repo = url.searchParams.get('repo');
    const pathParam = url.searchParams.get('path');
    const branch = url.searchParams.get('branch') || 'main';

    if (!owner || !repo || !pathParam) {
      return NextResponse.json({ error: 'Missing query params' }, { status: 400 });
    }

    // sanitize cache name
    const safePath = pathParam.replace(/[^a-zA-Z0-9._\-\/]/g, '_');
    const cacheName = `${owner}-${repo}-${branch}-${safePath}-meta.json`;

    // Try cache first
    const cached = await readCache(cacheName);
    if (cached) {
      try {
        return NextResponse.json(JSON.parse(cached));
      } catch (e) {
        // fall through to fetch
      }
    }

    // Fetch latest commit for this path to get last modified
    const commitsUrl = `https://api.github.com/repos/${owner}/${repo}/commits?path=${encodeURIComponent(pathParam)}&per_page=1&sha=${encodeURIComponent(branch)}`;
    const commitsRes = await fetch(commitsUrl, { headers: getGitHubHeaders('application/vnd.github.v3+json') });
    if (!commitsRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch commits' }, { status: commitsRes.status });
    }
    const commitsJson = await commitsRes.json();
    if (!Array.isArray(commitsJson) || commitsJson.length === 0) {
      const payload = { lastModified: null };
      await writeCache(cacheName, JSON.stringify(payload));
      return NextResponse.json(payload);
    }

    const latest = commitsJson[0];
    const lastModified = latest?.commit?.committer?.date || latest?.commit?.author?.date || null;
    const commitSha = latest?.sha || null;
    const payload = { lastModified, commitSha };
    // cache result
    await writeCache(cacheName, JSON.stringify(payload));

    return NextResponse.json(payload);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 });
  }
}
