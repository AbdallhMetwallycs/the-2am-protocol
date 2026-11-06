import { invite } from "../content";
import { CallViz } from "./CallViz";
import { LastFiveMinutes } from "./LastFiveMinutes";
import { PlanCard } from "./PlanCard";

/** Phase one: the five steps, the fake call clock, and the denial counter. */
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

      <CallViz />

      <p className="disclaimer">{copy.call.disclaimer}</p>

      <LastFiveMinutes />
    </section>
  );
}
