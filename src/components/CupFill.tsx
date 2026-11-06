import { useId } from "react";

export type Drink = "tea" | "coffee";

const CUP_OUTLINE =
  "M28 50 H92 L86 92 A10 10 0 0 1 76 100 H44 A10 10 0 0 1 34 92 Z";
const CUP_INTERIOR =
  "M31 52 H89 L84 91 A8 8 0 0 1 76 98 H44 A8 8 0 0 1 36 91 Z";
const HANDLE = "M92 62 h5 a11 11 0 0 1 0 22 h-7";

type CupFillProps = {
  drink: Drink;
  label?: string;
};

/**
 * The cup that fills itself. Mount it with a changing React `key` whenever the
 * drink changes and the pour replays from empty.
 */
export function CupFill({ drink, label }: CupFillProps) {
  const id = useId().replace(/:/g, "");
  const clipId = `${id}-interior`;
  const porcelainId = `${id}-porcelain`;

  return (
    <svg
      viewBox="0 0 120 120"
      className="cup"
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {label ? <title>{label}</title> : null}

      <defs>
        <clipPath id={clipId}>
          <path d={CUP_INTERIOR} />
        </clipPath>
        <linearGradient id={porcelainId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF0DF" stopOpacity=".95" />
          <stop offset="100%" stopColor="#E9CDA9" stopOpacity=".78" />
        </linearGradient>
      </defs>

      <g
        fill="none"
        stroke="#D97891"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity=".8"
      >
        <path className="cup-steam" d="M46 42c-5-6 5-11 0-18" />
        <path className="cup-steam cup-steam--two" d="M60 40c-5-6 5-11 0-18" />
        <path className="cup-steam cup-steam--three" d="M74 42c-5-6 5-11 0-18" />
      </g>

      <ellipse cx="60" cy="104" rx="41" ry="6" fill="#E9CDA9" opacity=".12" />
      <ellipse
        cx="60"
        cy="103"
        rx="41"
        ry="6"
        fill="none"
        stroke="#E9CDA9"
        strokeOpacity=".3"
      />

      <path d={HANDLE} fill="none" stroke="#E9CDA9" strokeWidth="4" />
      <path d={CUP_OUTLINE} fill={`url(#${porcelainId})`} opacity=".2" />

      <g clipPath={`url(#${clipId})`}>
        <rect
          className={`cup-liquid cup-liquid--${drink}`}
          x="28"
          y="52"
          width="64"
          height="46"
        />
      </g>

      <path
        d={CUP_OUTLINE}
        fill="none"
        stroke="#E9CDA9"
        strokeWidth="2.2"
        strokeOpacity=".72"
      />
      <path
        d="M28 50 H92"
        stroke="#FFF0DF"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity=".8"
      />
    </svg>
  );
}
