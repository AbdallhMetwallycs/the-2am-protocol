import { invite } from "../content";
import type { TermGroupId } from "../content";

type TermsPickerProps = {
  drinkLabel: string;
  values: Record<TermGroupId, string>;
  onChange: (id: TermGroupId, value: string) => void;
};

/**
 * The six rows of the invitation, filled in with tonight's answer. Three of
 * them are chips the recipient can switch; the rest are fixed jokes.
 */
export function TermsPicker({
  drinkLabel,
  values,
  onChange,
}: TermsPickerProps) {
  const copy = invite.accepted.terms;
  const group = (id: TermGroupId) => copy.groups.find((item) => item.id === id);

  const chips = (id: TermGroupId) => {
    const item = group(id);
    if (!item) return null;

    return (
      <span className="chips" role="group" aria-label={item.label}>
        {item.options.map((option) => (
          <button
            key={option}
            type="button"
            className="chip"
            aria-pressed={values[id] === option}
            onClick={() => onChange(id, option)}
          >
            {option}
          </button>
        ))}
      </span>
    );
  };

  return (
    <div className="terms">
      <p className="section-eyebrow terms-eyebrow">
        <span className="section-eyebrow-line" aria-hidden="true" />
        {copy.eyebrow}
      </p>
      <p className="terms-intro">{copy.intro}</p>

      <dl className="terms-rows">
        <div className="term-row">
          <dt>{copy.activityLabel}</dt>
          <dd>{drinkLabel}, endless talking, zero sleep.</dd>
        </div>

        <div className="term-row">
          <dt>{group("starting")?.label}</dt>
          <dd>{chips("starting")}</dd>
        </div>

        <div className="term-row">
          <dt>{copy.durationLabel}</dt>
          <dd>{copy.durationValue}</dd>
        </div>

        <div className="term-row">
          <dt>{copy.locationLabel}</dt>
          <dd>{copy.locationValue}</dd>
        </div>

        <div className="term-row">
          <dt>{group("dress")?.label}</dt>
          <dd>{chips("dress")}</dd>
        </div>

        <div className="term-row">
          <dt>{group("exit")?.label}</dt>
          <dd>{chips("exit")}</dd>
        </div>
      </dl>

      <p className="terms-hint">{copy.hint}</p>
    </div>
  );
}
