import { useEffect, useRef } from "react";
import { intro } from "../data.js";

const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";
const GRID = 6;
const DUR = 1100;

export default function IntroDots({ color }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ink = color || "#050505";

    let W = 0, H = 0;
    let dots = [];
    let raf = null;
    let start = 0;
    let running = false;

    const buildTargets = () => {
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(W));
      off.height = Math.max(1, Math.floor(H));
      const octx = off.getContext("2d");
      octx.fillStyle = "#000";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      const lines = intro.headline;
      const fs = Math.min(W / 6.2, 84);
      const lh = fs * 1.05;
      octx.font = `800 ${fs}px ${MONO}`;
      const startY = H / 2 - ((lines.length - 1) * lh) / 2;
      lines.forEach((ln, i) => octx.fillText(ln, W / 2, startY + i * lh));

      const px = octx.getImageData(0, 0, off.width, off.height).data;
      const targets = [];
      for (let y = 0; y < off.height; y += GRID) {
        for (let x = 0; x < off.width; x += GRID) {
          if (px[(y * off.width + x) * 4 + 3] > 128) targets.push({ x, y });
        }
      }
      return targets;
    };

    const seed = () => {
      dots = buildTargets().map((t) => ({
        tx: t.x, ty: t.y,
        sx: Math.random() * W, sy: Math.random() * H,
        delay: Math.random() * 260,
      }));
    };

    const easeOut = (p) => 1 - Math.pow(1 - p, 3);

    const draw = (now) => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = ink;
      const t = now - start;
      let done = true;
      for (const d of dots) {
        let p = reduce ? 1 : (t - d.delay) / DUR;
        if (p < 0) { p = 0; done = false; }
        else if (p < 1) done = false;
        else p = 1;
        const e = easeOut(p);
        ctx.beginPath();
        ctx.arc(d.sx + (d.tx - d.sx) * e, d.sy + (d.ty - d.sy) * e, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!done) raf = requestAnimationFrame(draw);
      else running = false;
    };

    const play = () => {
      start = performance.now();
      if (!running) { running = true; raf = requestAnimationFrame(draw); }
    };

    const resize = () => {
      const w = wrap.clientWidth;
      const h = Math.round(Math.min(200, Math.max(140, w * 0.28)));
      if (w === W && h === H) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      W = w; H = h;
      seed();
      play();
    };

    const reassemble = () => { seed(); play(); };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    canvas.addEventListener("click", reassemble);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      canvas.removeEventListener("click", reassemble);
    };
  }, []);

  return (
    <div className="intro-dots" ref={wrapRef}>
      <canvas ref={canvasRef} role="img" aria-label={intro.tagline} title="Click to re-assemble" />
    </div>
  );
}
