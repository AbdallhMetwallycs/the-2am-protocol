import type { CSSProperties, MouseEvent } from "react";
import { invite } from "../content";
import { MoonMark } from "./MoonMark";
import { MoonSeal } from "./MoonSeal";

const delay = (value: string) => ({ "--delay": value } as CSSProperties);

type FinalInviteProps = {
  onAccept: (event: MouseEvent<HTMLButtonElement>) => void;
};

/** Phase three: the card itself, stamped, and the only way through it. */
export function FinalInvite({ onAccept }: FinalInviteProps) {
  const copy = invite.final;

  return (
    <section className="section final" aria-labelledby="final-title">
      <p className="section-eyebrow">
        <span className="section-eyebrow-line" aria-hidden="true" />
        {copy.eyebrow}
      </p>

      <h2 id="final-title" className="section-heading">
        <span>{copy.headingLead}</span>
        <span className="section-heading-accent">
          <span className="accent-text">{copy.headingAccent}</span>
          <span className="headline-emoji" aria-hidden="true">
            {copy.headingEmoji}
          </span>
        </span>
      </h2>

      <p className="section-intro">{copy.invitation}</p>

      <div className="card-wrap">
        <article className="invite-card" aria-labelledby="final-card-title">
          <MoonSeal className="moon-seal" />

          <header className="card-head">
            <span className="card-label">{copy.card.label}</span>
            <span className="card-number">{copy.card.number}</span>
          </header>

          <h3 id="final-card-title" className="card-title">
            {copy.card.titleLead} <em>{copy.card.titleAccent}</em>
          </h3>

          <dl className="card-rows">
            {copy.card.rows.map((row) => (
              <div className="card-row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="perforation" aria-hidden="true">
            <span />
            <span />
          </div>

          <p className="card-note">
            <MoonMark className="card-note-mark" />
            {copy.card.note}
          </p>

          <footer className="card-foot">
            <span>{copy.card.stub}</span>
            <span>{copy.card.number}</span>
          </footer>
        </article>
      </div>

      <div className="cta-wrap" style={delay("120ms")}>
        <button
          type="button"
          className="cta"
          onClick={onAccept}
          aria-label={`${copy.cta} ${copy.ctaEmoji}`}
        >
          <span className="cta-sheen" aria-hidden="true" />
          <span className="cta-text">{copy.cta}</span>
          <span className="cta-emoji" aria-hidden="true">
            {copy.ctaEmoji}
          </span>
        </button>
        <p className="micro">{copy.micro}</p>
      </div>
    </section>
  );
}
