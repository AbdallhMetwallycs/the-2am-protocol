import { useState } from "react";
import type { CSSProperties } from "react";
import { buildWhatsappUrl, invite } from "../content";
import type { TermGroupId } from "../content";
import { CupFill } from "./CupFill";
import type { Drink } from "./CupFill";
import { TermsPicker } from "./TermsPicker";

const delay = (value: string) => ({ "--delay": value } as CSSProperties);

/** Every row starts on its first option, which matches the invitation card. */
const defaultTerms = () =>
  Object.fromEntries(
    invite.accepted.terms.groups.map((group) => [group.id, group.options[0]]),
  ) as Record<TermGroupId, string>;

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
      />
    </svg>
  );
}

type AcceptedProps = {
  onReplay: () => void;
};

/** The verdict, a cup that fills itself, and the button that sends it. */
export function Accepted({ onReplay }: AcceptedProps) {
  const copy = invite.accepted;
  const [drink, setDrink] = useState<Drink>("tea");
  const [pour, setPour] = useState(0);
  const [terms, setTerms] = useState<Record<TermGroupId, string>>(defaultTerms);

  const switchDrink = () => {
    setDrink((current) => (current === "tea" ? "coffee" : "tea"));
    setPour((current) => current + 1);
  };

  const pickTerm = (id: TermGroupId, value: string) => {
    setTerms((current) => ({ ...current, [id]: value }));
  };

  const shareUrl = buildWhatsappUrl({
    drink: copy.cup.inMessage[drink],
    starting: terms.starting,
    dress: terms.dress,
    exit: terms.exit,
  });

  return (
    <section className="screen accepted" aria-labelledby="accepted-title">
      <div className="accepted-inner">
        <p className="section-eyebrow reveal" style={delay("60ms")}>
          <span className="section-eyebrow-line" aria-hidden="true" />
          {copy.eyebrow}
        </p>

        <h2
          id="accepted-title"
          className="accepted-heading reveal"
          style={delay("140ms")}
        >
          <span>{copy.headingLead}</span>
          <span className="accepted-heading-accent">
            <span className="accent-text">{copy.headingAccent}</span>
            <span className="headline-emoji" aria-hidden="true">
              {copy.headingEmoji}
            </span>
          </span>
        </h2>

        <p className="accepted-intro reveal" style={delay("220ms")}>
          {copy.intro}
        </p>

        <div className="pour reveal" style={delay("300ms")}>
          <p className="pour-line">
            {copy.pouring}{" "}
            <span className="pour-emoji" aria-hidden="true">
              {copy.pourEmoji}
            </span>
          </p>

          <button
            type="button"
            className="cup-button"
            onClick={switchDrink}
            aria-label={`Currently ${copy.cup[drink]}. Tap to switch to ${
              drink === "tea" ? copy.cup.coffee : copy.cup.tea
            }.`}
          >
            <CupFill
              key={`${drink}-${pour}`}
              drink={drink}
              label={`${copy.cup[drink]} being poured`}
            />
          </button>

          <p className="cup-hint">
            {copy.cup[drink]} · {copy.cup.hint}
          </p>
        </div>

        <div className="terms-block reveal" style={delay("360ms")}>
          <TermsPicker
            drinkLabel={copy.cup[drink]}
            values={terms}
            onChange={pickTerm}
          />
        </div>

        <div className="ps-block reveal" style={delay("420ms")}>
          <p className="ps-title">{copy.psTitle}</p>
          <p className="ps-body">{copy.psBody}</p>
        </div>

        <div className="share-block reveal" style={delay("500ms")}>
          <a
            className="wa-button"
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="wa-icon" aria-hidden="true">
              <WhatsAppGlyph />
            </span>
            <span>
              {copy.share.label}{" "}
              <span className="wa-emoji" aria-hidden="true">
                {copy.share.emoji}
              </span>
            </span>
          </a>
          <p className="share-hint">{copy.share.hint}</p>
        </div>

        <button type="button" className="replay" onClick={onReplay}>
          {copy.replay}
        </button>
      </div>
    </section>
  );
}
