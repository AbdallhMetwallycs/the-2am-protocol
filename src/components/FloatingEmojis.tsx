import type { CSSProperties } from "react";
import { invite } from "../content";
import type { Surprise } from "../content";

const PLACEMENTS = [
  { left: "7%", top: "24%", size: 22, delay: -3, duration: 19 },
  { left: "86%", top: "17%", size: 18, delay: -10, duration: 23 },
  { left: "78%", top: "68%", size: 21, delay: -6, duration: 17 },
  { left: "12%", top: "74%", size: 17, delay: -14, duration: 21 },
  { left: "48%", top: "88%", size: 16, delay: -5, duration: 25 },
  { left: "92%", top: "44%", size: 15, delay: -12, duration: 18 },
];

type FloatingEmojisProps = {
  onSurprise: (surprise: Surprise) => void;
};

/**
 * Decorative glyphs that drift across the night. They are also the easter
 * eggs: tapping one asks the page to show a hidden line.
 */
export function FloatingEmojis({ onSurprise }: FloatingEmojisProps) {
  return (
    <div className="floater-layer" aria-label="Night decorations">
      {PLACEMENTS.map((item, index) => {
        const surprise = invite.surprises[index % invite.surprises.length];
        return (
          <button
            key={`${surprise.glyph}-${index}`}
            type="button"
            className="floater"
            style={
              {
                left: item.left,
                top: item.top,
                fontSize: `${item.size}px`,
                animationDelay: `${item.delay}s`,
                animationDuration: `${item.duration}s`,
              } as CSSProperties
            }
            onClick={() => onSurprise(surprise)}
            aria-label={`${surprise.label} — tap for a surprise`}
          >
            <span aria-hidden="true">{surprise.glyph}</span>
          </button>
        );
      })}
    </div>
  );
}
