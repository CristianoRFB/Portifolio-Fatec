"use client";

import React from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/lib/createEmotionCache';
import { useServerInsertedHTML } from 'next/navigation';

export default function EmotionCacheProvider({ children }: { children: React.ReactNode }) {
  const cache = createEmotionCache();

  useServerInsertedHTML(() => {
    // Emotion stores inserted tags on cache.sheet.tags during server render.
    // Collect them and inject a style tag into the HTML head to avoid
    // hydration mismatches between server and client.
    // Accessing internal API and casting to any is intentional here.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sheet = (cache.sheet as any);
    if (!sheet || !sheet?.tags || sheet.tags.length === 0) return null;
    const css = sheet.tags.map((t: any) => t.textContent).join('');
    const dataEmotion = `${cache.key} ${sheet.tags.map((t: any) => t.key).join(' ')}`;
    return <style data-emotion={dataEmotion} dangerouslySetInnerHTML={{ __html: css }} />;
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
