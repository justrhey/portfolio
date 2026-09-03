import { useEffect, useRef } from "react";

const SRC = import.meta.env.BASE_URL + "section.mp4";
// Dark -> light. Space keeps dark pixels empty so it reads as a faint texture.
const RAMP = " .:-=+*#%@";
// Coarser grid = lighter field + far fewer glyphs to draw (cheaper).
const CELL_W = 11;
const CELL_H = 16;
const FONT_PX = 13;

// Renders section.mp4 as a dim, changing colour ASCII field behind the
// project list. The video is an offscreen pixel source, scrubbed by how far the
// section has scrolled through the viewport. Repaints only when the frame moves.
export default function AsciiVideo() {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const sampler = document.createElement("canvas");
    const sctx = sampler.getContext("2d", { willReadFrequently: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = null;
    let cols = 0, rows = 0, duration = 0;
    let target = 0, current = 0, lastFrame = -1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      cols = Math.max(1, Math.floor(w / CELL_W));
      rows = Math.max(1, Math.floor(h / CELL_H));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      sampler.width = cols;
      sampler.height = rows;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_PX}px "Space Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(226,226,226,0.3)";
      lastFrame = -1;
    };

    // How far the section has scrolled through the viewport (0..1)
    const progress = () => {
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      return total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    };

    const paint = () => {
      if (!video.videoWidth || !cols || !rows) return;
      sctx.drawImage(video, 0, 0, cols, rows);
      const data = sctx.getImageData(0, 0, cols, rows).data;
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          const ch = RAMP[(Math.min(1, lum * 1.5) * (RAMP.length - 1)) | 0];
          if (ch !== " ") {
            // Tint each glyph with the source pixel's colour, punched up so it
            // reads against the dark backdrop instead of the old flat grey.
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
            ctx.fillText(ch, x * CELL_W, y * CELL_H);
          }
        }
      }
    };

    // Sweep only through the clip's content window (bright swirl frames), so the
    // ASCII stays dense from the first item down to the last text.
    const LO = 0.16, HI = 0.6;
    const seek = () => { if (duration) video.currentTime = (LO + (HI - LO) * current) * duration; };
    const onFrame = () => {
      if (video.currentTime !== lastFrame) { paint(); lastFrame = video.currentTime; }
    };
    const onMeta = () => { duration = video.duration || 0; resize(); seek(); };
    const onScroll = () => { target = progress(); if (reduce) { current = target; seek(); } };
    const tick = () => {
      current += (target - current) * 0.09; // smooth scrub
      seek();
      raf = requestAnimationFrame(tick);
    };

    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("loadeddata", onFrame);
    video.addEventListener("seeked", onFrame);
    window.addEventListener("resize", resize);

    // Only fetch the clip and run the scrub loop while the section is near the
    // viewport — nothing decodes or animates on initial page load.
    let active = false;
    const start = () => {
      if (active) return;
      active = true;
      resize();
      if (video.preload !== "auto") { video.preload = "auto"; video.load(); }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      if (!reduce) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (!active) return;
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { rootMargin: "0px" }
    );
    io.observe(wrap);

    return () => {
      io.disconnect();
      stop();
      window.removeEventListener("resize", resize);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("loadeddata", onFrame);
      video.removeEventListener("seeked", onFrame);
    };
  }, []);

  return (
    <div className="showcase__bg" ref={wrapRef} aria-hidden="true">
      <div className="ascii-vid">
        <video ref={videoRef} className="ascii-vid__src" src={SRC} muted playsInline preload="none" />
        <canvas ref={canvasRef} className="ascii-vid__canvas" />
      </div>
    </div>
  );
}
