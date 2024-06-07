// useQueue gives you an easy way to manage a queue type data
// structure. If you're not familiar, a queue follows the FIFO (first in,
// first out) principle. This means that the first element added to the
// queue is the first element that should be removed.

import * as React from "react";

export default function useQueue(initialValue = []) {
  const [queue, setQueue] = React.useState<any[]>(initialValue);

  const add = React.useCallback((element: any) => {
    if (element) {
      setQueue((q) => [...q, element]);
    }
  }, []);

  const remove = React.useCallback(() => {
    let removedElement;

    setQueue(([first, ...q]) => {
      removedElement = first;
      return q;
    });

    return removedElement;
  }, []);

  const clear = React.useCallback(() => {
    setQueue([]);
  }, []);

  return {
    add,
    remove,
    clear,
    first: queue[0],
    last: queue[queue.length - 1],
    size: queue.length,
    queue,
  };
}
