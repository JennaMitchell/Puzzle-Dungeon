// useMouse gives you a convenient way to both track the mouse position relative to the entire document as well as
// the mouse position relative to a specific element if you so choose.

// It uses the [`mousemove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event) browser event under the hood.

// No matter what:

// - `x`: The mouse position relative to the entire document's left edge.
// - `y`: The mouse position relative to the entire document's top edge.

// If `ref` is attached to an element:

// - `elementX`: The mouse position relative to the element's left edge.
//- `elementY`: The mouse position relative to the element's top edge.
//- `elementPositionX`: The element's position relative to the entire document.
//- `elementPositionY`: The element's position relative to the entire document.

import * as React from "react";

export default function useMouse() {
  const [state, setState] = React.useState({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  });

  const ref = React.useRef<null | HTMLElement>(null);

  React.useLayoutEffect(() => {
    const handleMouseMove = (event: any) => {
      let newState: { [key: string]: any } = {
        elementX: event.pageX,
        elementY: event.pageY,
      };

      if (ref.current && ref.current.nodeType === Node.ELEMENT_NODE) {
        const { left, top } = ref.current.getBoundingClientRect();
        const elementPositionX = left + window.scrollX;
        const elementPositionY = top + window.scrollY;
        const elementX = event.pageX - elementPositionX;
        const elementY = event.pageY - elementPositionY;

        newState.elementX = elementX;
        newState.elementY = elementY;
        newState.elementPositionX = elementPositionX;
        newState.elementPositionY = elementPositionY;
      }

      setState((s) => {
        return {
          ...s,
          ...newState,
        };
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return [state, ref];
}
