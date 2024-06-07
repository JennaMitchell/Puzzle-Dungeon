// useObjectState works similar to useState in
// that it returns an array with the first item being the state and the
// second being a way to update that state.
// However, unlike useState,
// the state that useObjectState manages is an object and it will merge the new state with the old state instead of replacing it.

import * as React from "react";

const isPlainObject = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

export default function useObjectState(initialValue: any) {
  const [state, setState] = React.useState(initialValue);

  const handleUpdate = React.useCallback((arg: any) => {
    if (typeof arg === "function") {
      setState((s: any) => {
        const newState = arg(s);

        if (isPlainObject(newState)) {
          return {
            ...s,
            ...newState,
          };
        }
      });
    }

    if (isPlainObject(arg)) {
      setState((s: any) => ({
        ...s,
        ...arg,
      }));
    }
  }, []);

  return [state, handleUpdate];
}
