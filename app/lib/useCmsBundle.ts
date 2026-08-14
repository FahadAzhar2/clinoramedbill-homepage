"use client";

import { useEffect, useState } from "react";
import { fetchCmsBundle, type CmsBundle } from "./sanity";

let cachedBundle: CmsBundle | undefined;
let pendingBundle: Promise<CmsBundle> | undefined;

export function useCmsBundle() {
  const [bundle, setBundle] = useState<CmsBundle | undefined>(cachedBundle);

  useEffect(() => {
    if (cachedBundle) return;
    const controller = new AbortController();
    pendingBundle ??= fetchCmsBundle(controller.signal);
    pendingBundle
      .then((nextBundle) => {
        cachedBundle = nextBundle;
        setBundle(nextBundle);
      })
      .catch(() => {
        pendingBundle = undefined;
      });
    return () => controller.abort();
  }, []);

  return bundle;
}
