import { ReactLenis } from 'lenis/react';

export default function SmoothScrollProvider({ children }) {
  return <ReactLenis root options={{ lerp: .08, smoothWheel: true, syncTouch: false }}>
    {children}
  </ReactLenis>;
}
