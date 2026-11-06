import { useId } from "react";

/** The stamp on the invitation card: a wax seal, but for an insomniac. */
export function MoonSeal({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const arcId = `${id}-arc`;
  const gradientId = `${id}-gradient`;

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={gradientId} cx="36%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#D97891" />
          <stop offset="46%" stopColor="#761E45" />
          <stop offset="100%" stopColor="#2A0D1C" />
        </radialGradient>
        <path
          id={arcId}
          d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
        />
      </defs>

      <circle cx="60" cy="62" r="55" fill="#0A0711" opacity=".5" />
      <circle cx="60" cy="60" r="54" fill={`url(#${gradientId})`} />
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="#E9CDA9"
        strokeOpacity=".45"
      />
      <circle
        cx="60"
        cy="60"
        r="48"
        fill="none"
        stroke="#FFF0DF"
        strokeOpacity=".24"
        strokeDasharray="1 4"
      />

      <text
        fill="#E9CDA9"
        fillOpacity=".9"
        fontSize="6.4"
        letterSpacing="2"
        fontFamily="Manrope, sans-serif"
        fontWeight="600"
      >
        <textPath href={`#${arcId}`} startOffset="0">
          CERTIFIED INSOMNIAC · NO EXIT STRATEGY ·
        </textPath>
      </text>

      <g transform="translate(42 34) scale(.56)" fill="#FFF0DF">
        <path d="M40 6a26 26 0 1 0 18 45A28 28 0 0 1 40 6Z" />
      </g>

      <text
        x="60"
        y="88"
        textAnchor="middle"
        fill="#FFF0DF"
        fillOpacity=".92"
        fontSize="7"
        letterSpacing="2.6"
        fontFamily="Manrope, sans-serif"
        fontWeight="800"
      >
        2 AM
      </text>
    </svg>
  );
}
