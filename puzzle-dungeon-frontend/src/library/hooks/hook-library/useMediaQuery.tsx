// `useMediaQuery` allows you to determine if the `document`'s dimensions match a specific media query string.
// It also listens for changes in the `document`'s dimensions in order to detect when it matches or stops matching the same media query string.

// It uses the browser's [`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API under the hood.

import * as React from "react";

export default function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    throw Error("useMediaQuery is a client-only hook");
  };

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // useSyncExternalStore is a React Hook that lets you subscribe to an external store.
}
