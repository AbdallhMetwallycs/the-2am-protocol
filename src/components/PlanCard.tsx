import type { CSSProperties } from "react";
import type { PlanStep } from "../content";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

type PlanCardProps = {
  step: PlanStep;
  /** Stagger, in milliseconds, so the cards arrive in order. */
  order: number;
  /** The last step gets the full width; it is the punchline. */
  wide?: boolean;
};

/** One numbered step of the protocol. */
export function PlanCard({ step, order, wide = false }: PlanCardProps) {
  const { ref, inView } = useRevealOnScroll<HTMLElement>();

  return (
    <article
      ref={ref}
      className={[
        "plan-card",
        "in-view",
        inView ? "is-in" : "",
        wide ? "plan-card--wide" : "",
        step.index === "05" ? "plan-card--incident" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--delay": `${order * 110}ms` } as CSSProperties}
    >
      <div className="plan-card-top">
        <span className="plan-index">{step.index}</span>
        <span className="plan-emoji" aria-hidden="true">
          {step.emoji}
        </span>
      </div>

      <h3 className="plan-title">{step.title}</h3>
      <p className="plan-body">{step.body}</p>
    </article>
  );
}
