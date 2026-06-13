import {useSyncExternalStore} from 'react';

// Shared, page-wide state for the yt-dlp generators. The POT-provider port is
// set once (step 2) and has to flow into the config files (step 5), so it lives
// in a tiny module store rather than per-component state. A module store (vs.
// React context) means the separate <DockerCommand /> and <ConfigFiles />
// instances stay in sync without wrapping the MDX in a provider.

export const DEFAULT_PORT = 4416;

let port: number = DEFAULT_PORT;
const listeners = new Set<() => void>();

export function setPort(value: number): void {
  port = value;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Reactive read of the raw port value (may be NaN while the field is empty). */
export function usePort(): number {
  return useSyncExternalStore(
    subscribe,
    () => port,
    () => DEFAULT_PORT, // server snapshot
  );
}

/** Sanitised port for use in commands — falls back to the default if invalid. */
export function effectivePort(value: number): number {
  return Number.isFinite(value) && value >= 1 && value <= 65535
    ? value
    : DEFAULT_PORT;
}
