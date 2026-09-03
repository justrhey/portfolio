import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function LenisConnector() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return undefined;
    const tick = (time) => lenis.raf(time * 1000);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(tick);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScrollProvider({ children }) {
  return <ReactLenis root options={{ lerp: .08, smoothWheel: true, syncTouch: false, autoRaf: false }}>
    <LenisConnector />
    {children}
  </ReactLenis>;
}
