import { invite } from "../content";
import { PlanCard } from "./PlanCard";

/** Phase one: the five steps, and the honest estimate of how long it runs. */
export function PlanSequence() {
  const copy = invite.plan;

  return (
    <section className="section" aria-labelledby="plan-title">
      <p className="section-eyebrow">
        <span className="section-eyebrow-line" aria-hidden="true" />
        {copy.eyebrow}
      </p>

      <h2 id="plan-title" className="section-heading">
        <span>{copy.headingLead}</span>
        <span className="section-heading-accent">
          <span className="accent-text">{copy.headingAccent}</span>
          <span className="headline-emoji" aria-hidden="true">
            {copy.headingEmoji}
          </span>
        </span>
      </h2>

      <p className="section-intro">{copy.intro}</p>

      <div className="plan-grid">
        {copy.steps.map((step, index) => (
          <PlanCard
            key={step.index}
            step={step}
            order={index}
            wide={index === copy.steps.length - 1}
          />
        ))}
      </div>

      <div className="duration-card">
        <p className="duration-label">{copy.duration.label}</p>
        <p className="duration-value">
          {copy.duration.value}
          <span className="duration-caption">{copy.duration.caption}</span>
        </p>
        <p className="duration-note">{copy.duration.note}</p>
      </div>
    </section>
  );
}
