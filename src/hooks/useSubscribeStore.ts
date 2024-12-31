import { useEffect } from "react";

import { useStore } from "../store/useStore";

import type { State } from "../store/useStore.types";

export default function useSubscribeStore<U>(
  selector: (state: State) => U,
  listener: (selectedState: U, previousSelectedState: U) => void,
  options?: {
    equalityFn?: (a: U, b: U) => boolean;
    fireImmediately?: boolean;
  },
): void {
  useEffect(() => {
    const selectorListener = useStore.subscribe<U>(selector, listener, options);

    return (): void => {
      selectorListener();
    };
  });
}
