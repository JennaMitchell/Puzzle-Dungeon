//`useLocalStorage` gives you a convenient interface for
//storing and retrieving data from local storage in a React application.
//Its API is similar to `useState`, but it stores the value in [`localState`]
//(https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) instead of component state.
import * as React from "react";

const dispatchStorageEvent = (key: any, newValue: any) => {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
};

const setItem = (key: string, value: any) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getItem = (key: string) => {
  return window.localStorage.getItem(key);
};

const subscribe = (callback: any) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getServerSnapshot = () => {
  throw Error("useLocalStorage is a client-only hook");
};

export default function useLocalStorage(key: string, initialValue: any) {
  const getSnapshot = () => getItem(key);

  const store = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setState = React.useCallback(
    (v: any) => {
      if (store) {
        try {
          const nextState = typeof v === "function" ? v(JSON.parse(store)) : v;

          if (nextState === undefined || nextState === null) {
            removeItem(key);
          } else {
            setItem(key, nextState);
          }
        } catch (e) {
          console.warn(e);
        }
      }
    },
    [key, store]
  );

  React.useEffect(() => {
    if (getItem(key) === null && typeof initialValue !== "undefined") {
      setItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState];
}
