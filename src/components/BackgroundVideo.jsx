import { useEffect, useRef } from "react";

const SRC = import.meta.env.BASE_URL + "bg.mp4";

// Bitmap backdrop scrubbed frame-by-frame by page scroll. Never auto-plays,
// never loops. The clip is re-encoded all-intra (every frame a keyframe) so each
// seek is exact; a slow rAF lerp eases the scroll->time mapping so motion drifts
// gradually instead of snapping.
export default function BackgroundVideo() {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = null;
    let target = 0;
    let current = 0;
    let duration = 0;

    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    const seek = () => { if (duration) video.currentTime = current * duration; };
    const onMeta = () => { duration = video.duration || 0; seek(); };

    const onScroll = () => {
      target = progress();
      if (reduce) { current = target; seek(); }
    };

    const tick = () => {
      current += (target - current) * 0.045; // low factor = slow, cinematic ease
      seek();
      raf = requestAnimationFrame(tick);
    };

    video.addEventListener("loadedmetadata", onMeta);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (!reduce) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="bg-video"
      src={SRC}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
