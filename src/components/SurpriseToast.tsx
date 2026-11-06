import { useEffect, useState } from "react";
import type { Surprise } from "../content";

export type Toast = { id: number; surprise: Surprise };

const VISIBLE_MS = 2_900;

/**
 * The line shown after a drifting decoration is tapped. It announces itself
 * politely and disappears on its own; tapping another one replaces it.
 */
export function SurpriseToast({ toast }: { toast: Toast | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <p className={`toast${visible ? " is-visible" : ""}`} role="status">
      <span className="toast-glyph" aria-hidden="true">
        {toast.surprise.glyph}
      </span>
      {toast.surprise.message}
    </p>
  );
}
