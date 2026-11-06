type SoundControlProps = {
  playing: boolean;
  supported: boolean;
  onToggle: () => void;
};

/**
 * The only audio control on the page. It never starts by itself, and the
 * browser being unable to make audio disables it instead of breaking anything.
 */
export function SoundControl({
  playing,
  supported,
  onToggle,
}: SoundControlProps) {
  return (
    <button
      type="button"
      className={`sound-control${playing ? " is-playing" : ""}`}
      onClick={onToggle}
      aria-label={
        supported
          ? playing
            ? "Mute the night ambience"
            : "Play the night ambience"
          : "This browser cannot play the ambient sound"
      }
      aria-pressed={playing}
      disabled={!supported}
      title={playing ? "Mute the night" : "Play the night"}
    >
      <span className="sound-bars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="sound-label">{playing ? "Sound on" : "Sound off"}</span>
    </button>
  );
}
