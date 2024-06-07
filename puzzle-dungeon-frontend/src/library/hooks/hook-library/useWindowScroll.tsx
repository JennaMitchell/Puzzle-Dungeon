//`useWindowScroll` allows you to conveniently track the current scroll position of the window as well as scroll to a specific position.

//Under the hood it listens to the browser's `scroll` event and updates its `x` and `y` state with `window.scrollX` and
//`window.scrollY`. It also returns a `scrollTo` function that uses the same API as [`window.scrollTo`]
//(https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo).

import * as React from "react";

export default function useWindowScroll() {
  const [state, setState] = React.useState<{
    x: null | number;
    y: null | number;
  }>({
    x: null,
    y: null,
  });

  const scrollTo = React.useCallback((...args: any[]) => {
    if (typeof args[0] === "object") {
      window.scrollTo(args[0]);
    } else if (typeof args[0] === "number" && typeof args[1] === "number") {
      window.scrollTo(args[0], args[1]);
    } else {
      throw new Error(`Invalid arguments passed to scrollTo`);
    }
  }, []);

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [state, scrollTo];
}
