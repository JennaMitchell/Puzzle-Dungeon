// useToggle has a similar API to useState in that both return an array with the first item being the state
// and the second item being a way to update that state.
// state value can only ever be a boolean.
import * as React from "react";

export default function useToggle(initialValue = true) {
  const [on, setOn] = React.useState(() => {
    if (typeof initialValue === "boolean") {
      return initialValue;
    }

    return Boolean(initialValue);
  });

  const handleToggle = React.useCallback((value: boolean) => {
    if (typeof value === "boolean") {
      return setOn(value);
    }

    return setOn((v) => !v);
  }, []);

  return [on, handleToggle];
}
