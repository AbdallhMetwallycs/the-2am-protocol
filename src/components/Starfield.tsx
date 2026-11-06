import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Star = {
  /** Position as a fraction of the viewport, so resizing keeps the sky. */
  x: number;
  y: number;
  radius: number;
  alpha: number;
  phase: number;
  speed: number;
  hue: number;
};

type Mote = {
  x: number;
  y: number;
  radius: number;
  drift: number;
  rise: number;
  alpha: number;
};

const STAR_HUES = ["#FFF0DF", "#E9CDA9", "#D97891"];

/**
 * The animated midnight sky: twinkling stars plus a few warm particles that
 * drift upward like steam. Under reduced motion it paints a single still
 * frame, and the loop stops entirely when the tab is hidden.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let raf = 0;
    let stopped = false;

    let stars: Star[] = [];
    let motes: Mote[] = [];

    const seed = () => {
      const area = width * height;
      const starCount = Math.max(46, Math.min(150, Math.round(area / 9_000)));
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random(),
        y: Math.random(),
        radius: 0.4 + Math.random() * 1.5,
        alpha: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.9,
        hue: Math.floor(Math.random() * STAR_HUES.length),
      }));

      const moteCount = width < 560 ? 8 : 14;
      motes = Array.from({ length: moteCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.8 + Math.random() * 1.8,
        drift: (Math.random() - 0.5) * 0.16,
        rise: 0.06 + Math.random() * 0.2,
        alpha: 0.1 + Math.random() * 0.22,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const paint = (time: number, animate: boolean) => {
      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        const twinkle = animate
          ? 0.55 + 0.45 * Math.sin(time * 0.0012 * star.speed + star.phase)
          : 0.75;
        context.globalAlpha = Math.max(0, Math.min(1, star.alpha * twinkle));
        context.fillStyle = STAR_HUES[star.hue];
        context.beginPath();
        context.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2);
        context.fill();
      }

      for (const mote of motes) {
        context.globalAlpha = mote.alpha;
        context.fillStyle = "#E9CDA9";
        context.beginPath();
        context.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
        context.fill();

        if (!animate) continue;
        mote.x += mote.drift;
        mote.y -= mote.rise;
        if (mote.y < -12) {
          mote.y = height + 12;
          mote.x = Math.random() * width;
        }
        if (mote.x < -12) mote.x = width + 12;
        if (mote.x > width + 12) mote.x = -12;
      }

      context.globalAlpha = 1;
    };

    const frame = (time: number) => {
      if (stopped) return;
      paint(time, true);
      raf = window.requestAnimationFrame(frame);
    };

    const startLoop = () => {
      if (reducedMotion || document.visibilityState !== "visible") return;
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(frame);
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        startLoop();
      } else {
        window.cancelAnimationFrame(raf);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    if (reducedMotion) {
      paint(0, false);
    } else {
      startLoop();
    }

    return () => {
      stopped = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
