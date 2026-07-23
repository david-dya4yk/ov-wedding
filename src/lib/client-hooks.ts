"use client";

import { useCallback, useSyncExternalStore } from "react";

const noopSubscribe = (): (() => void) => {
  return () => {
    /* nothing to unsubscribe from */
  };
};

export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => {
        list.removeEventListener("change", onChange);
      };
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function createTicker(intervalMs: number): {
  subscribe: (onChange: () => void) => () => void;
  getSnapshot: () => number;
} {
  const listeners = new Set<() => void>();
  let current = 0;
  let timer: number | null = null;

  const tick = (): void => {
    current = Date.now();
    for (const listener of listeners) {
      listener();
    }
  };

  return {
    subscribe(onChange) {
      listeners.add(onChange);
      if (timer === null) {
        tick();
        timer = window.setInterval(tick, intervalMs);
      }
      return () => {
        listeners.delete(onChange);
        if (listeners.size === 0 && timer !== null) {
          window.clearInterval(timer);
          timer = null;
        }
      };
    },
    getSnapshot() {
      return current;
    },
  };
}

const secondTicker = createTicker(1000);

export function useNowMs(): number {
  return useSyncExternalStore(
    secondTicker.subscribe,
    secondTicker.getSnapshot,
    () => 0,
  );
}
