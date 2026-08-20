import { useRef } from "react";

export function usePersistFn<T extends (...args: never[]) => unknown>(fn: T): T {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useRef((...args: never[]) => fnRef.current(...args)).current as T;
}
