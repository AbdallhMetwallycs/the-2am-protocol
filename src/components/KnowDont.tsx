import { useState } from "react";
import type { CSSProperties } from "react";
import { invite } from "../content";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const EXTRAS_PER_TAP = 3;

type KnowItemProps = {
  text: string;
  order: number;
  admitted: boolean;
  onToggle: () => void;
};

/** One accusation, optionally marked as admitted. */
function KnowItem({ text, order, admitted, onToggle }: KnowItemProps) {
  const { ref, inView } = useRevealOnScroll<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className={`in-view${inView ? " is-in" : ""}`}
      style={{ "--delay": `${Math.min(order, 5) * 120}ms` } as CSSProperties}
    >
      <button
        type="button"
        className={`know-item${admitted ? " is-admitted" : ""}`}
        onClick={onToggle}
        aria-pressed={admitted}
      >
        <span className="know-mark" aria-hidden="true">
          {admitted ? "✓" : "·"}
        </span>
        <span className="know-text">{text}</span>
      </button>
    </li>
  );
}

/**
 * Phase two: the things nobody says out loud. Tapping one admits it; the
 * button at the bottom releases three more at a time.
 */
export function KnowDont() {
  const copy = invite.know;
  const [admitted, setAdmitted] = useState<string[]>([]);
  const [shown, setShown] = useState(0);

  const extras = copy.extras.slice(0, shown);
  const exhausted = shown >= copy.extras.length;

  const toggle = (message: string) =>
    setAdmitted((current) =>
      current.includes(message)
        ? current.filter((item) => item !== message)
        : [...current, message],
    );

  return (
    <section className="section" aria-labelledby="know-title">
      <p className="section-eyebrow">
        <span className="section-eyebrow-line" aria-hidden="true" />
        {copy.eyebrow}
      </p>

      <h2 id="know-title" className="section-heading">
        <span>{copy.headingLead}</span>
        <span className="section-heading-accent">
          <span className="accent-text">{copy.headingAccent}</span>
          <span className="headline-emoji" aria-hidden="true">
            {copy.headingEmoji}
          </span>
        </span>
      </h2>

      <p className="section-intro">{copy.intro}</p>

      <ul className="know-list">
        {copy.messages.map((message, index) => (
          <KnowItem
            key={message}
            text={message}
            order={index}
            admitted={admitted.includes(message)}
            onToggle={() => toggle(message)}
          />
        ))}

        {extras.map((message, index) => (
          <KnowItem
            key={message}
            text={message}
            order={copy.messages.length + index}
            admitted={admitted.includes(message)}
            onToggle={() => toggle(message)}
          />
        ))}
      </ul>

      <div className="know-more">
        <button
          type="button"
          className="secondary"
          onClick={() =>
            setShown((current) =>
              Math.min(current + EXTRAS_PER_TAP, copy.extras.length),
            )
          }
          disabled={exhausted}
        >
          {copy.more.label}
          <span className="secondary-emoji" aria-hidden="true">
            {copy.more.emoji}
          </span>
        </button>

        <p className="know-more-hint" role="status">
          {exhausted ? copy.more.exhausted : copy.more.hint}
        </p>
      </div>
    </section>
  );
}
