'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import flagsmith from 'flagsmith';

interface FeatureFlags {
  loading: boolean;
  allFeatureFlags: Record<string, { enabled: boolean }> | undefined;
}

const FeatureFlagContext = createContext<FeatureFlags>({
  loading: true,
  allFeatureFlags: undefined,
});

export const useFeatureFlags = () => useContext(FeatureFlagContext);

export default function FeatureFlagProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [flagsmithFFs, setFlagsmithFFs] = useState<FeatureFlags>({
    loading: true,
    allFeatureFlags: undefined,
  });

  useEffect(() => {
    flagsmith.init({
      environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENV_KEY || '',
      angularHttpClient: null as any,
      onChange: () => {
        setFlagsmithFFs({
          loading: false,
          allFeatureFlags: flagsmith.getAllFlags() as Record<
            string,
            { enabled: boolean }
          >,
        });
      },
    });
  }, []);

  return (
    <FeatureFlagContext.Provider value={flagsmithFFs}>
      {children}
    </FeatureFlagContext.Provider>
  );
}
