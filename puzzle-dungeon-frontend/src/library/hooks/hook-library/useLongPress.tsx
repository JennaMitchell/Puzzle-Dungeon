//`useLongPress` gives you a convenient way to add and manage long-press interactions to an element in a React application.

// What it returns is a set of attributes that you can spread onto any element you'd like to add long press functionality to.
// @ts-nocheck
import * as React from "react";

export function isTouchEvent({ nativeEvent }) {
  return window.TouchEvent
    ? nativeEvent instanceof TouchEvent
    : "touches" in nativeEvent;
}

export function isMouseEvent(event) {
  return event.nativeEvent instanceof MouseEvent;
}

export default function useLongPress(callback, options = {}) {
  const { threshold = 400, onStart, onFinish, onCancel } = options;
  const isLongPressActive = React.useRef(false);
  const isPressed = React.useRef(false);
  const timerId = React.useRef();

  return React.useMemo(() => {
    if (typeof callback !== "function") {
      return {};
    }

    const start = (event) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return;

      if (onStart) {
        onStart(event);
      }

      isPressed.current = true;
      timerId.current = setTimeout(() => {
        callback(event);
        isLongPressActive.current = true;
      }, threshold);
    };

    const cancel = (event) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return;

      if (isLongPressActive.current) {
        if (onFinish) {
          onFinish(event);
        }
      } else if (isPressed.current) {
        if (onCancel) {
          onCancel(event);
        }
      }

      isLongPressActive.current = false;
      isPressed.current = false;

      if (timerId.current) {
        window.clearTimeout(timerId.current);
      }
    };

    const mouseHandlers = {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
    };

    const touchHandlers = {
      onTouchStart: start,
      onTouchEnd: cancel,
    };

    return {
      ...mouseHandlers,
      ...touchHandlers,
    };
  }, [callback, threshold, onCancel, onFinish, onStart]);
}
