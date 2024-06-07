//useLogger is a hook that can be used in development to give
//you more insight into when your component renders and re-renders.
// Specifically, it logs the name you give it along with any arguments as well as
// if the component is on the initial render (mounted), being updated (updated), or about to be removed from the DOM (unmounted).

import * as React from "react";

export default function useLogger(name: string, ...rest: any[]) {
  const initialRenderRef = React.useRef(true);

  React.useEffect(() => {
    if (initialRenderRef.current === false) {
      console.log(`${name} "updated":`, rest);
    }
  });

  React.useEffect(() => {
    console.log(`${name} "mounted":`, rest);
    initialRenderRef.current = false;

    return () => {
      console.log(`${name} "unmounted":`, rest);

      initialRenderRef.current = true;
    };
  }, [name, rest]);
}
