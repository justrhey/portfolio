import { useEffect, useRef } from "react";
import { profile } from "../data.js";

const PHRASE = ` ${profile.name.toUpperCase()} · FULL-STACK DEVELOPER · `;

// Text vortex. The whole glyph field rotates rigidly, so we render it ONCE to an
// offscreen buffer and then just rotate-and-blit that single image each frame —
// one drawImage instead of thousands of fillText calls (the old lag source).
// Pointer hold scales the blit to dive into the eye.
export default function AsciiSpiral() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const buf = document.createElement("canvas");
    const bctx = buf.getContext("2d");

    let raf = null;
    let w = 0, h = 0, side = 0, dpr = 1;
    let baseRot = 0;
    let dive = 0, diveTarget = 0;
    let lastT = performance.now();
    let cleanupIO = () => {};

    // Pre-render the entire vortex into the offscreen buffer (called on resize)
    const build = () => {
      const maxR = Math.hypot(w, h) * 0.6;
      side = Math.ceil(maxR * 2);
      buf.width = Math.round(side * dpr);
      buf.height = Math.round(side * dpr);
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, side, side);
      bctx.textAlign = "center";
      bctx.textBaseline = "middle";
      bctx.fillStyle = "#e2e2e2";

      const cx = side / 2, cy = side / 2;
      const startR = 26, ringGap = 15;
      let ci = 0, ring = 0;
      for (let r = startR; r < maxR + ringGap; r += ringGap, ring++) {
        const fs = 9 + Math.min(1, r / maxR) * 4;
        const charW = fs * 0.62;
        const count = Math.max(8, Math.floor((2 * Math.PI * r) / charW));
        const angStep = (2 * Math.PI) / count;
        const ringRot = ring * 0.16;
        const t = Math.min(1, r / maxR);
        const ringAlpha = Math.min(1, (r - startR) / 60) * (1 - t * t);
        if (ringAlpha <= 0.02) { ci += count; continue; }
        bctx.font = `${fs}px "Space Mono", ui-monospace, monospace`;
        for (let k = 0; k < count; k++, ci++) {
          const ch = PHRASE[ci % PHRASE.length];
          if (ch === " ") continue;
          const a = ringRot + k * angStep;
          bctx.globalAlpha = ringAlpha * (0.7 + 0.3 * Math.sin(ci * 12.9898));
          bctx.save();
          bctx.translate(cx + r * Math.cos(a), cy + r * Math.sin(a));
          bctx.rotate(a + Math.PI / 2);
          bctx.fillText(ch, 0, 0);
          bctx.restore();
        }
      }
      bctx.globalAlpha = 1;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const blit = (rot, zoom) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(rot);
      ctx.scale(zoom, zoom);
      ctx.drawImage(buf, -side / 2, -side / 2, side, side);
      ctx.restore();
    };

    let running = false;
    const render = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastT) / 1000);
      lastT = now;
      dive += (diveTarget - dive) * 0.08;
      baseRot += dt * (0.12 + dive * 1.6);
      blit(baseRot, 1 + dive * 2.2);
      raf = requestAnimationFrame(render);
    };
    const play = () => { if (running) return; running = true; lastT = performance.now(); raf = requestAnimationFrame(render); };
    const pause = () => { running = false; cancelAnimationFrame(raf); };

    const onResize = () => { resize(); if (reduce) blit(0.4, 1); };
    const onDown = () => { diveTarget = 1; };
    const onUp = () => { diveTarget = 0; };

    resize();
    window.addEventListener("resize", onResize);
    if (reduce) {
      blit(0.4, 1);
    } else {
      canvas.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
      // Only spin while the vortex is actually on screen
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : pause()));
      io.observe(canvas);
      cleanupIO = () => io.disconnect();
    }

    return () => {
      pause();
      cleanupIO();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="ascii-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="ascii-bg__canvas" />
      <span className="ascii-bg__brand">arkodevph.com</span>
      <span className="ascii-bg__hint">Click &amp; hold</span>
    </div>
  );
}
