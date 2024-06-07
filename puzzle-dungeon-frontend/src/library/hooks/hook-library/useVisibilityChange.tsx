// useVisibilityChange is useful for tracking the visibility state (document.visibilityState)
// of the document. It returns a boolean value that indicates whether the
// document is visible or not. It also updates the value when the document's visibility state changes by adding
// an event listener to the document's visibilitychange event.

import * as React from "react";

const subscribe = (callback: () => void) => {
  document.addEventListener("visibilitychange", callback);

  return () => {
    document.removeEventListener("visibilitychange", callback);
  };
};

const getSnapshot = () => {
  return document.visibilityState;
};

const getServerSnapshot = () => {
  throw Error("useVisibilityChange is a client-only hook");
};

export default function useVisibilityChange() {
  const visibilityState = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return visibilityState === "visible";
}
