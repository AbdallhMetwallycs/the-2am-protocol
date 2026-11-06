import { useEffect, useRef } from "react";

export type BurstOrigin = {
  id: number;
  x: number;
  y: number;
};

type Shape = "moon" | "star" | "cup" | "spark";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  life: number;
  ttl: number;
  color: string;
  shape: Shape;
};

const COLORS = [
  "#D97891",
  "#E9CDA9",
  "#FFF0DF",
  "#761E45",
  "#42152D",
  "#F2B8C6",
  "#C8913F",
];

const SHAPES: Shape[] = ["moon", "star", "cup", "spark"];

function drawMoon(ctx: CanvasRenderingContext2D, size: number) {
  const r = size * 0.46;
  ctx.beginPath();
  ctx.arc(0, 0, r, Math.PI * 0.32, Math.PI * 1.68, false);
  ctx.arc(r * 0.52, 0, r * 0.86, Math.PI * 1.68, Math.PI * 0.32, true);
  ctx.closePath();
  ctx.fill();
}

function drawStar(ctx: CanvasRenderingContext2D, size: number) {
  const outer = size * 0.5;
  const inner = outer * 0.42;
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawCup(ctx: CanvasRenderingContext2D, size: number) {
  const w = size * 0.72;
  const h = size * 0.56;
  ctx.beginPath();
  ctx.moveTo(-w / 2, -h / 2);
  ctx.lineTo(w / 2, -h / 2);
  ctx.lineTo(w / 2 - w * 0.14, h / 2);
  ctx.lineTo(-w / 2 + w * 0.14, h / 2);
  ctx.closePath();
  ctx.fill();
}

function drawSpark(ctx: CanvasRenderingContext2D, size: number) {
  const s = size * 0.6;
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.quadraticCurveTo(s * 0.16, -s * 0.16, s, 0);
  ctx.quadraticCurveTo(s * 0.16, s * 0.16, 0, s);
  ctx.quadraticCurveTo(-s * 0.16, s * 0.16, -s, 0);
  ctx.quadraticCurveTo(-s * 0.16, -s * 0.16, 0, -s);
  ctx.closePath();
  ctx.fill();
}

/**
 * The celebration after accepting: moons, stars, cups and sparks thrown from
 * the button that was pressed. Skipped completely under reduced motion.
 */
export function Burst({ burst }: { burst: BurstOrigin }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let raf = 0;
    let stopped = false;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const isPhone = width < 560;
    const count = isPhone ? 110 : 170;
    const particles: Particle[] = [];
    const originX = Math.min(Math.max(burst.x, width * 0.12), width * 0.88);
    const originY = Math.min(Math.max(burst.y, height * 0.12), height * 0.88);

    for (let i = 0; i < count; i += 1) {
      const shower = i > count * 0.66;
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 11;

      particles.push({
        x: shower ? Math.random() * width : originX + (Math.random() - 0.5) * 12,
        y: shower
          ? -20 - Math.random() * 80
          : originY + (Math.random() - 0.5) * 8,
        vx: shower ? (Math.random() - 0.5) * 2.4 : Math.cos(angle) * speed,
        vy: shower
          ? 1 + Math.random() * 2.4
          : Math.sin(angle) * speed * 0.72 - (4 + Math.random() * 7),
        size: 5 + Math.random() * 10,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2,
        life: 0,
        ttl: shower ? 190 + Math.random() * 110 : 90 + Math.random() * 95,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      });
    }

    let last = 0;
    const start = performance.now();

    const frame = (timestamp: number) => {
      if (stopped) return;
      if (!last) last = timestamp;
      const delta = Math.min(2.4, (timestamp - last) / 16.667);
      last = timestamp;

      context.clearRect(0, 0, width, height);

      let alive = 0;
      for (const particle of particles) {
        particle.life += delta;
        if (particle.life >= particle.ttl) continue;
        alive += 1;

        particle.vy += 0.15 * delta;
        particle.vx *= 0.994;
        particle.vy *= 0.996;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.rotation += particle.spin * delta;

        if (particle.y > height + 40) continue;

        const alpha = Math.min(
          1,
          particle.life / 7,
          (particle.ttl - particle.life) / 26,
        );

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.globalAlpha = Math.max(0, alpha);
        context.fillStyle = particle.color;

        if (particle.shape === "moon") drawMoon(context, particle.size);
        else if (particle.shape === "star") drawStar(context, particle.size);
        else if (particle.shape === "cup") drawCup(context, particle.size);
        else drawSpark(context, particle.size);

        context.restore();
      }

      if (alive === 0 || timestamp - start > 6_200) {
        context.clearRect(0, 0, width, height);
        return;
      }
      raf = window.requestAnimationFrame(frame);
    };

    raf = window.requestAnimationFrame(frame);

    return () => {
      stopped = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [burst]);

  return <canvas ref={canvasRef} className="burst-canvas" aria-hidden="true" />;
}
