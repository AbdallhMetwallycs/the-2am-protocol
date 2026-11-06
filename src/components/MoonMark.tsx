type MoonMarkProps = {
  className?: string;
  title?: string;
};

/**
 * A crescent moon resting over a small cup — the mark used for the brand,
 * the footer, and the oversized shapes floating in the backdrop.
 */
export function MoonMark({ className, title }: MoonMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M40 6a26 26 0 1 0 18 45A28 28 0 0 1 40 6Z"
        fill="currentColor"
      />
      <path
        d="M14 40h20v6a10 10 0 0 1-10 10h0a10 10 0 0 1-10-10Z"
        fill="currentColor"
        fillOpacity=".55"
      />
      <path
        d="M34 42h4a5 5 0 0 1 0 10h-3"
        stroke="currentColor"
        strokeOpacity=".5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 34c-1.6 1.8 1.6 3.4 0 5.2M27 32c-1.6 1.8 1.6 3.4 0 5.2"
        stroke="currentColor"
        strokeOpacity=".45"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
