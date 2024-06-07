// The useWindowSize hook is useful for retrieving and tracking the dimensions (innerWidth and innerHeight) of the browser window.
// It attaches an event listener to the resize event, ensuring its state (width and height) are updated dynamically whenever the window is resized.

import * as React from "react";

type sizeState = {
  width: null | number;
  height: null | number;
};

export default function useWindowSize() {
  const [size, setSize] = React.useState<sizeState>({
    width: null,
    height: null,
  });

  React.useLayoutEffect(() => {
    const handler = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    // may need to useReducer not useLAyoutEffectis in alpha or useEffect

    handler();
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return size;
}
