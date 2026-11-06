import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Accepted } from "./components/Accepted";
import { Backdrop } from "./components/Backdrop";
import { Burst, type BurstOrigin } from "./components/Burst";
import { FloatingEmojis } from "./components/FloatingEmojis";
import { MoonMark } from "./components/MoonMark";
import { Night } from "./components/Night";
import { Opening } from "./components/Opening";
import { SoundControl } from "./components/SoundControl";
import { SurpriseToast, type Toast } from "./components/SurpriseToast";
import { invite } from "./content";
import type { Surprise } from "./content";
import { useNightAmbience } from "./hooks/useNightAmbience";
import { useReducedMotion } from "./hooks/useReducedMotion";

type Stage = "opening" | "night" | "accepted";

const TITLES: Record<Stage, string> = {
  opening: "The 2 AM Protocol ☕🌙",
  night: "The 2 AM Protocol — the plan 😏",
  accepted: "Approved by the Insomnia Committee 🌙",
};

const STATUS: Record<Stage, string> = {
  opening: "Opening screen. One button to begin the night.",
  night: "The night plan is open. Scroll to the invitation.",
  accepted: "Invitation accepted. The WhatsApp button is ready.",
};

const TRANSITION_MS = 420;

export default function App() {
  const [stage, setStage] = useState<Stage>("opening");
  const [leaving, setLeaving] = useState(false);
  const [burst, setBurst] = useState<BurstOrigin | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const locked = useRef(false);

  const reducedMotion = useReducedMotion();
  const { playing, supported, toggle } = useNightAmbience();

  useEffect(() => {
    document.title = TITLES[stage];
    if (stage === "opening") return;

    window.scrollTo(0, 0);
    const frame = window.requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => window.cancelAnimationFrame(frame);
  }, [stage]);

  const goTo = useCallback(
    (next: Stage, origin?: { x: number; y: number }) => {
      if (locked.current) return;
      locked.current = true;

      if (origin) setBurst({ id: Date.now(), ...origin });
      setLeaving(true);

      window.setTimeout(
        () => {
          setStage(next);
          setLeaving(false);
          locked.current = false;
        },
        reducedMotion ? 0 : TRANSITION_MS,
      );
    },
    [reducedMotion],
  );

  const handleBegin = useCallback(() => goTo("night"), [goTo]);

  const handleAccept = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      goTo("accepted", {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    },
    [goTo],
  );

  const handleSurprise = useCallback(
    (surprise: Surprise) => setToast({ id: Date.now(), surprise }),
    [],
  );

  return (
    <div className="app">
      <Backdrop />

      <header className="site-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <MoonMark />
          </span>
          <span className="brand-text">
            <span className="brand-name">{invite.brand.name}</span>
            <span className="brand-meta">
              {invite.brand.edition} · {invite.brand.place}
            </span>
          </span>
        </div>

        <SoundControl
          playing={playing}
          supported={supported}
          onToggle={() => void toggle()}
        />
      </header>

      <FloatingEmojis onSurprise={handleSurprise} />

      <main className="site-main">
        {stage === "opening" ? (
          <Opening leaving={leaving} onBegin={handleBegin} />
        ) : stage === "night" ? (
          <Night leaving={leaving} onAccept={handleAccept} />
        ) : (
          <Accepted onReplay={() => goTo("opening")} />
        )}
      </main>

      <footer className="site-footer">
        <span className="footer-mark" aria-hidden="true">
          <MoonMark />
        </span>
        <span>{invite.brand.tagline}</span>
        <span aria-hidden="true">·</span>
        <span>{invite.footer}</span>
      </footer>

      {stage === "accepted" && burst ? <Burst burst={burst} /> : null}

      <SurpriseToast toast={toast} />

      <p className="sr-only" role="status" aria-live="polite">
        {STATUS[stage]}
      </p>
    </div>
  );
}
