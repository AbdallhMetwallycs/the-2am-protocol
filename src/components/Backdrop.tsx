import { MoonMark } from "./MoonMark";
import { Starfield } from "./Starfield";

/**
 * Everything behind the words: the midnight gradient, three drifting glows,
 * the moon halo, film grain, a vignette, a hairline frame and the star canvas.
 */
export function Backdrop() {
  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <div className="orb orb--one" />
        <div className="orb orb--two" />
        <div className="orb orb--three" />

        <div className="moon-glow" />

        <MoonMark className="backdrop-moon backdrop-moon--one" />
        <MoonMark className="backdrop-moon backdrop-moon--two" />

        <div className="grain" />
        <div className="vignette" />
        <div className="frame" />
      </div>

      <Starfield />
    </>
  );
}
