import { useState } from "react";
import { invite } from "../content";

/**
 * The running joke, made clickable. Every tap is another "last five minutes"
 * that was not, until the list runs out and the last line repeats.
 */
export function LastFiveMinutes() {
  const copy = invite.plan.lastFive;
  const [taps, setTaps] = useState(0);

  const reply =
    taps === 0
      ? copy.note
      : copy.replies[Math.min(taps - 1, copy.replies.length - 1)];

  return (
    <div className="last-five">
      <button
        type="button"
        className="last-five-chip"
        onClick={() => setTaps((current) => current + 1)}
      >
        {copy.label}
        <span className="last-five-count" aria-hidden="true">
          {taps}
        </span>
      </button>

      <p className="last-five-reply" role="status">
        {reply}
      </p>
    </div>
  );
}
