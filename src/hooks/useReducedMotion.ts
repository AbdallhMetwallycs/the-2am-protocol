import { useEffect, useState } from "react";

/**
 * Live view of the user's motion preference. CSS already collapses the
 * animations; this lets JavaScript skip the work that CSS cannot, such as
 * canvas loops and screen-transition delays.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setReduced(query.matches);
    sync();

    if (typeof query.addEventListener !== "function") return;
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return reduced;
}
