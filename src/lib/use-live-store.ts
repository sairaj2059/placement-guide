"use client";

import { useEffect, useState } from "react";
import { getStore } from "./store";

// Forces a re-read of the store whenever it changes (same tab, via the
// custom event dispatched in store.ts's write()) so components stay in
// sync without prop drilling or a heavier state library.
export function useLiveStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const rerender = () => setTick((t) => t + 1);
    window.addEventListener("signal-store-updated", rerender);
    return () => window.removeEventListener("signal-store-updated", rerender);
  }, []);

  return getStore();
}
