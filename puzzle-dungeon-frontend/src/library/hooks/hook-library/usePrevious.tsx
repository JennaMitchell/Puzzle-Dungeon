//creates a way to set state only when it has changed else it returns the previous state

import * as React from "react";

export default function usePrevious(value: any) {
  const [current, setCurrent] = React.useState(value);
  const [previous, setPrevious] = React.useState(null);

  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
}
