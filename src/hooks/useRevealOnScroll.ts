import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

/**
 * Reveals an element once, when it first scrolls into view. Browsers without
 * IntersectionObserver show it immediately instead of hiding it forever.
 */
export function useRevealOnScroll<T extends HTMLElement>(
  threshold = 0.15,
): { ref: RefObject<T | null>; inView: boolean } {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver !== "function") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
