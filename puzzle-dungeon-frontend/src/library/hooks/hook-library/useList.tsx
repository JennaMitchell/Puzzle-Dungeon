// useList allows the user to more conveniently manage a list
// of items. It returns an array with the list as the first element and an
// object with methods to manage the list as the second element.

import * as React from "react";

type elementType = string | number | boolean;

export default function useList(defaultList = []) {
  const [list, setList] = React.useState<any[]>(defaultList);

  const set = React.useCallback((l: []) => {
    setList(l);
  }, []);

  const push = React.useCallback((element: elementType[]) => {
    setList((l) => [...l, element]);
  }, []);

  const removeAt = React.useCallback((index: number) => {
    setList((l) => [...l.slice(0, index), ...l.slice(index + 1)]);
  }, []);

  const insertAt = React.useCallback((index: number, element: elementType) => {
    setList((l) => [...l.slice(0, index), element, ...l.slice(index)]);
  }, []);

  const updateAt = React.useCallback((index: number, element: elementType) => {
    setList((l) => l.map((e, i) => (i === index ? element : e)));
  }, []);

  const clear = React.useCallback(() => setList([]), []);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}
