import React, { useState } from 'react';
import { hydrate } from 'react-dom';
import { CacheProvider } from '@emotion/react';
import { RemixBrowser } from '@remix-run/react';
import createEmotionCache from '@styles/emotion-cache';
import { ClientStyleContext } from '@styles/styles-context';

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

hydrate(
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>,
  document,
);
