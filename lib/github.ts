import fs from 'fs';
import path from 'path';

export function getGitHubHeaders(accept?: string) {
  const headers: Record<string, string> = {};
  if (accept) headers.Accept = accept;
  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  return headers;
}

export async function readCache(cacheName: string): Promise<string | null> {
  try {
    const cacheDir = path.join(process.cwd(), '.cache');
    const file = path.join(cacheDir, cacheName);
    if (fs.existsSync(file)) {
      return await fs.promises.readFile(file, { encoding: 'utf-8' });
    }
  } catch (e) {
    // ignore cache read errors
  }
  return null;
}

export async function writeCache(cacheName: string, content: string) {
  try {
    const cacheDir = path.join(process.cwd(), '.cache');
    await fs.promises.mkdir(cacheDir, { recursive: true });
    const file = path.join(cacheDir, cacheName);
    await fs.promises.writeFile(file, content, { encoding: 'utf-8' });
  } catch (e) {
    // ignore cache write errors
  }
}
