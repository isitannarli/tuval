/** Dependencies */
import { useEffect, type RefObject } from "react";

type AnyEvent = MouseEvent | TouchEvent;

export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void,
): void {
  useEffect(() => {
    const listener = (event: AnyEvent): void => {
      const element = ref.current;

      if (element === null || element.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };

    // Reload only if ref or handler changes
  }, [ref, handler]);
}
