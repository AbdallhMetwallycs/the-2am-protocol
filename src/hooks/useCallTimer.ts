import { useEffect, useState } from "react";

const MAX_SECONDS = 5 * 60 * 60 + 59 * 60 + 59;

export type CallTimerOptions = {
  /** Where the fake call starts, in seconds. */
  startSeconds: number;
  /** Seconds added per tick, so the clock visibly runs fast. */
  speed: number;
  /** False freezes the clock — used for reduced motion. */
  running: boolean;
};

/**
 * A theatrical call-duration clock. It counts a made-up number, stops at six
 * hours, and reads the page's visibility so it never burns CPU in a pocket.
 */
export function useCallTimer({
  startSeconds,
  speed,
  running,
}: CallTimerOptions) {
  const [seconds, setSeconds] = useState(startSeconds);

  useEffect(() => {
    if (!running) return;

    const tick = () => {
      if (document.visibilityState !== "visible") return;
      setSeconds((current) => Math.min(current + speed, MAX_SECONDS));
    };

    const id = window.setInterval(tick, 1_000);
    return () => window.clearInterval(id);
  }, [running, speed]);

  return seconds;
}

/** Seconds as HH:MM:SS, zero padded. */
export function formatCallTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}
