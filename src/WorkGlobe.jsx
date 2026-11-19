import { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard.jsx';

const goldenAngle = Math.PI * (3 - Math.sqrt(5));

function rotate([x, y, z], yaw, pitch) {
  const turnedX = x * Math.cos(yaw) + z * Math.sin(yaw);
  const turnedZ = z * Math.cos(yaw) - x * Math.sin(yaw);
  return [turnedX, y * Math.cos(pitch) - turnedZ * Math.sin(pitch), y * Math.sin(pitch) + turnedZ * Math.cos(pitch)];
}

export default function WorkGlobe({ projects }) {
  const sceneRef = useRef(null);
  const rotateRef = useRef(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = scene.querySelector('canvas');
    const cards = [...scene.querySelectorAll('.work-globe-card')];
    const context = canvas.getContext('2d');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 620px)');
    const points = projects.map((_, index) => {
      const y = 1 - 2 * (index + .5) / projects.length;
      const radius = Math.sqrt(1 - y * y);
      return [Math.cos(index * goldenAngle) * radius, y, Math.sin(index * goldenAngle) * radius];
    });
    let yaw = .45;
    let pitch = -.18;
    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;
    let visible = false;
    let dragging = false;
    let pointerX = 0;
    let pointerY = 0;
    let dragDistance = 0;
    let lastDragTime = 0;
    let hovering = false;
    let focused = false;
    let yawVelocity = 0;
    let targetYaw = null;
    let pointerTime = 0;

    const project = (point) => {
      const [x, y, z] = rotate(point, yaw, pitch);
      return { x: width / 2 + x * width * .34, y: height / 2 - 14 + y * height * .32, z };
    };

    const draw = () => {
      if (compact.matches || motion.matches) return;
      context.clearRect(0, 0, width, height);
      context.lineWidth = .8;
      for (let latitude = -2; latitude <= 2; latitude++) {
        const y = latitude / 3;
        const radius = Math.sqrt(1 - y * y);
        for (let step = 0; step < 32; step++) {
          const a = project([Math.cos(step * Math.PI / 16) * radius, y, Math.sin(step * Math.PI / 16) * radius]);
          const b = project([Math.cos((step + 1) * Math.PI / 16) * radius, y, Math.sin((step + 1) * Math.PI / 16) * radius]);
          context.strokeStyle = `rgba(155, 174, 160, ${.055 + .095 * (1 + (a.z + b.z) / 2) / 2})`;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
      for (let meridian = 0; meridian < 10; meridian++) {
        const longitude = meridian * Math.PI / 5;
        for (let step = 0; step < 24; step++) {
          const latitudeA = -Math.PI / 2 + step * Math.PI / 24;
          const latitudeB = -Math.PI / 2 + (step + 1) * Math.PI / 24;
          const a = project([Math.cos(latitudeA) * Math.cos(longitude), Math.sin(latitudeA), Math.cos(latitudeA) * Math.sin(longitude)]);
          const b = project([Math.cos(latitudeB) * Math.cos(longitude), Math.sin(latitudeB), Math.cos(latitudeB) * Math.sin(longitude)]);
          context.strokeStyle = `rgba(155, 174, 160, ${.055 + .095 * (1 + (a.z + b.z) / 2) / 2})`;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
      cards.forEach((card, index) => {
        const point = project(points[index]);
        const scale = .54 + .16 * (point.z + 1);
        card.style.transform = `translate3d(${point.x.toFixed(1)}px, ${point.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        card.style.zIndex = card === document.activeElement ? '105' : String(Math.round((point.z + 1) * 50));
        card.style.setProperty('--shade', (.02 + .25 * (1 - point.z) / 2).toFixed(2));
      });
    };

    const resize = () => {
      width = scene.clientWidth;
      height = scene.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };

    const tick = (time) => {
      if (!visible || motion.matches || compact.matches) return;
      const dt = previousTime ? Math.min(time - previousTime, 32) / 1000 : 0;
      if (!dragging && targetYaw !== null) {
        yawVelocity += (100 * (targetYaw - yaw) - 20 * yawVelocity) * dt;
        yaw += yawVelocity * dt;
        if (Math.abs(targetYaw - yaw) < .001 && Math.abs(yawVelocity) < .01) {
          yaw = targetYaw;
          targetYaw = null;
          yawVelocity = 0;
        }
      } else if (!dragging && !pausedRef.current && !hovering && !focused) yaw += dt * .12;
      previousTime = time;
      draw();
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (visible) frame = requestAnimationFrame(tick);
    }, { threshold: .05 });
    const onMotionChange = () => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (visible) frame = requestAnimationFrame(tick);
    };
    const onPointerDown = (event) => {
      if (motion.matches || compact.matches || event.button !== 0) return;
      dragging = true;
      targetYaw = null;
      yawVelocity = 0;
      dragDistance = 0;
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerTime = performance.now();
    };
    const onPointerMove = (event) => {
      if (!dragging) return;
      const dx = event.clientX - pointerX;
      const dy = event.clientY - pointerY;
      const now = performance.now();
      yawVelocity = Math.max(-4, Math.min(4, dx * .006 / Math.max((now - pointerTime) / 1000, .008)));
      pointerTime = now;
      dragDistance += Math.abs(dx) + Math.abs(dy);
      if (dragDistance > 6 && !scene.hasPointerCapture(event.pointerId)) scene.setPointerCapture(event.pointerId);
      yaw += dx * .006;
      pitch = Math.max(-.8, Math.min(.8, pitch + dy * .004));
      pointerX = event.clientX;
      pointerY = event.clientY;
      draw();
    };
    const onPointerUp = () => {
      if (!dragging) return;
      if (dragDistance > 6) {
        lastDragTime = performance.now();
        targetYaw = yaw + yawVelocity * .12;
      }
      dragging = false;
    };
    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; onPointerUp(); };
    const onFocus = (event) => {
      focused = true;
      const index = cards.indexOf(event.target.closest('.work-globe-card'));
      if (index < 0 || compact.matches || motion.matches) return;
      const [x, , z] = points[index];
      const facing = -Math.atan2(x, z);
      targetYaw = yaw + Math.atan2(Math.sin(facing - yaw), Math.cos(facing - yaw));
    };
    const onBlur = (event) => { focused = scene.contains(event.relatedTarget); };
    rotateRef.current = (direction) => { targetYaw = (targetYaw ?? yaw) + direction * .8; };
    const onClick = (event) => {
      if (performance.now() - lastDragTime < 350) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(scene);
    observer.observe(scene);
    motion.addEventListener('change', onMotionChange);
    compact.addEventListener('change', onMotionChange);
    scene.addEventListener('pointerenter', onEnter);
    scene.addEventListener('pointerleave', onLeave);
    scene.addEventListener('focusin', onFocus);
    scene.addEventListener('focusout', onBlur);
    scene.addEventListener('pointerdown', onPointerDown);
    scene.addEventListener('pointermove', onPointerMove);
    scene.addEventListener('pointerup', onPointerUp);
    scene.addEventListener('pointercancel', onPointerUp);
    scene.addEventListener('click', onClick, true);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      motion.removeEventListener('change', onMotionChange);
      compact.removeEventListener('change', onMotionChange);
      scene.removeEventListener('pointerenter', onEnter);
      scene.removeEventListener('pointerleave', onLeave);
      scene.removeEventListener('focusin', onFocus);
      scene.removeEventListener('focusout', onBlur);
      rotateRef.current = null;
      scene.removeEventListener('pointerdown', onPointerDown);
      scene.removeEventListener('pointermove', onPointerMove);
      scene.removeEventListener('pointerup', onPointerUp);
      scene.removeEventListener('pointercancel', onPointerUp);
      scene.removeEventListener('click', onClick, true);
    };
  }, [projects]);

  return <div className="work-globe-wrap">
    <div className="work-globe" ref={sceneRef} role="group" aria-label="Selected projects">
    <canvas className="work-globe-lines" aria-hidden="true" />
    {projects.map((project) => <a className="work-globe-card" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`} draggable="false" key={project.no}>
      <ProjectCard project={project} />
    </a>)}
    </div>
    <div className="work-globe-controls" role="group" aria-label="Project rotation">
      <button type="button" aria-label="Rotate projects left" onClick={() => rotateRef.current?.(-1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button>
      <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Resume rotation' : 'Pause rotation'}</button>
      <button type="button" aria-label="Rotate projects right" onClick={() => rotateRef.current?.(1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button>
    </div>
  </div>;
}
