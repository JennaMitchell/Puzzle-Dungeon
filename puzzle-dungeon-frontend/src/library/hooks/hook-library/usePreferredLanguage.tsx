//usePreferredLanguage returns a string that represents the
// preferred language of the user, as set in the browser settings. You can
// get access to their preferred language via navigator.language.
// You can listen to changes to the preferred language by adding an event listener for the languagechange event.

import * as React from "react";

const subscribe = (cb: any) => {
  window.addEventListener("languagechange", cb);
  return () => window.removeEventListener("languagechange", cb);
};

const getSnapshot = () => {
  return navigator.language;
};

const getServerSnapshot = () => {
  throw Error("usePreferredLanguage is a client-only hook");
};

export default function usePreferredLanguage() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
