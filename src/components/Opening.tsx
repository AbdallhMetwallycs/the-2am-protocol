import type { CSSProperties } from "react";
import { invite } from "../content";

type OpeningProps = {
  leaving: boolean;
  onBegin: () => void;
};

const delay = (value: string) => ({ "--delay": value } as CSSProperties);

/** The cinematic first screen, and the only question that matters. */
export function Opening({ leaving, onBegin }: OpeningProps) {
  const copy = invite.opening;

  return (
    <section
      className={`screen opening${leaving ? " is-leaving" : ""}`}
      aria-labelledby="opening-title"
    >
      <span className="opening-rail opening-rail--left" aria-hidden="true">
        {copy.railLeft}
      </span>
      <span className="opening-rail opening-rail--right" aria-hidden="true">
        {copy.railRight}
      </span>

      <div className="opening-inner">
        <p className="kicker reveal" style={delay("80ms")}>
          <span className="kicker-dot" aria-hidden="true" />
          {copy.kicker}
        </p>

        <h1 id="opening-title" className="headline reveal" style={delay("160ms")}>
          <span className="headline-line">{copy.headingLead}</span>
          <span className="headline-line headline-line--accent">
            <span className="accent-text">{copy.headingAccent}</span>
            <span className="headline-emoji" aria-hidden="true">
              {copy.headingEmoji}
            </span>
          </span>
        </h1>

        <p className="subtitle reveal" style={delay("260ms")}>
          {copy.subtitle}
        </p>

        <div className="question-card reveal" style={delay("360ms")}>
          <p className="question-label">{copy.questionLabel}</p>
          <p className="question" lang="ar" dir="rtl">
            {copy.question}
            <span className="question-emoji" aria-hidden="true">
              {copy.questionEmoji}
            </span>
          </p>
        </div>

        <p className="supporting reveal" style={delay("460ms")}>
          {copy.supporting}
        </p>

        <div className="cta-wrap reveal" style={delay("560ms")}>
          <button
            type="button"
            className="cta"
            onClick={onBegin}
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
      </div>
    </section>
  );
}
