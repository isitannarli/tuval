/** Dependencies */
import { useEffect } from "react";

/** Store */
import { useStore } from "../store/useStore";

/** Types */
import type { State } from "../store/useStore.types";

export default function useSubscribeStore<U>(
  selector: (state: State) => U,
  listener: (selectedState: U, previousSelectedState: U) => void,
  options?: {
    equalityFn?: (a: U, b: U) => boolean;
    fireImmediately?: boolean;
  }
) {
  useEffect(() => {
    useStore.subscribe<U>(selector, listener, options);

    return () => {
      useStore.destroy();
    };
  });
}
