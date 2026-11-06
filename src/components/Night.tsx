import type { CSSProperties, MouseEvent } from "react";
import { invite } from "../content";
import { FinalInvite } from "./FinalInvite";
import { KnowDont } from "./KnowDont";
import { PlanSequence } from "./PlanSequence";

type NightProps = {
  leaving: boolean;
  onAccept: (event: MouseEvent<HTMLButtonElement>) => void;
};

/**
 * The scroll sequence: what we are about to do, what we both pretend not to
 * know, and the invitation itself. Each phase is its own component.
 */
export function Night({ leaving, onAccept }: NightProps) {
  return (
    <section
      className={`screen night${leaving ? " is-leaving" : ""}`}
      aria-label="The night plan"
    >
      <p
        className="scroll-cue reveal"
        style={{ "--delay": "220ms" } as CSSProperties}
      >
        <span aria-hidden="true">↓</span>
        {invite.night.scrollCue}
      </p>

      <PlanSequence />
      <KnowDont />
      <FinalInvite onAccept={onAccept} />
    </section>
  );
}
