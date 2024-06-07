// What it does

// creates a way to set state and returns the state and the setState function
// then if the state passed to  it is null or undefined
// then it will default to the default value that it is given

import * as React from "react";

export default function useDefault(initialValue: any, defaultValue: any) {
  const [state, setState] = React.useState(initialValue);

  if (typeof state === "undefined" || state === null) {
    return [defaultValue, setState];
  }

  return [state, setState];
}
