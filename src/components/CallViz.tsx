import { invite } from "../content";
import { formatCallTime, useCallTimer } from "../hooks/useCallTimer";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * A fake call-duration clock. The numbers are theatre: no call is placed and
 * nothing is read from the device. Under reduced motion it shows one frozen
 * duration instead of counting.
 */
export function CallViz() {
  const copy = invite.plan.call;
  const reducedMotion = useReducedMotion();
  const seconds = useCallTimer({
    startSeconds: copy.startSeconds,
    speed: copy.speed,
    running: !reducedMotion,
  });

  return (
    <div className="call-timer">
      <p className="call-head">
        <span className="call-live-dot" aria-hidden="true" />
        {copy.label}
      </p>

      <p className="call-time" aria-live="off">
        {formatCallTime(seconds)}
      </p>

      <p className="call-caption">{copy.caption}</p>

      <div className="call-bars" aria-hidden="true">
        {Array.from({ length: 11 }, (_, index) => (
          <span key={index} style={{ animationDelay: `${index * -0.13}s` }} />
        ))}
      </div>

      <div className="call-archive">
        <p className="call-archive-label">{copy.archiveLabel}</p>
        {copy.archive.map((duration) => (
          <span className="call-archive-item" key={duration}>
            {duration}
          </span>
        ))}
      </div>
    </div>
  );
}
