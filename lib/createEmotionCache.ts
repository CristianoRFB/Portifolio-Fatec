import createCache from '@emotion/cache';

// Creates an Emotion cache with `prepend: true` so Emotion styles are
// inserted before other tags, which helps avoid hydration/order mismatch
// between server and client renders when using MUI + Emotion.
export default function createEmotionCache() {
  return createCache({ key: 'mui', prepend: true });
}
