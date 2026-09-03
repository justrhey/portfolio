import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import './Lanyard.css';

function Scene({ profilePhoto }) {
  const card = useRef();
  const invalidate = useThree((state) => state.invalidate);
  const portrait = useLoader(THREE.TextureLoader, profilePhoto);

  portrait.colorSpace = THREE.SRGBColorSpace;
  const cardFace = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#120d0b';
    ctx.fillRect(0, 0, 1024, 640);
    ctx.strokeStyle = '#a65327';
    ctx.lineWidth = 5;
    ctx.strokeRect(3, 3, 1018, 634);

    ctx.fillStyle = '#21120d';
    ctx.fillRect(0, 0, 1024, 76);
    ctx.fillStyle = '#d69a79';
    ctx.font = '600 22px monospace';
    ctx.fillText('PERSONAL PORTFOLIO', 38, 47);
    ctx.textAlign = 'right';
    ctx.fillText('JRT', 986, 47);
    ctx.textAlign = 'left';

    ctx.drawImage(portrait.image, 46, 118, 285, 345);
    ctx.strokeStyle = '#6e3b25';
    ctx.lineWidth = 3;
    ctx.strokeRect(46, 118, 285, 345);

    ctx.fillStyle = '#f26a16';
    ctx.font = '600 22px monospace';
    ctx.fillText('01 / PROFILE', 382, 135);
    ctx.fillStyle = '#eeeae4';
    ctx.font = '700 82px sans-serif';
    ctx.fillText('Justine', 378, 235);
    ctx.fillText('Rhey', 378, 320);
    ctx.fillStyle = '#f26a16';
    ctx.font = '500 28px monospace';
    ctx.fillText('Full-stack developer', 382, 375);

    ctx.strokeStyle = '#9a4b27';
    ctx.lineWidth = 2;
    ctx.strokeRect(382, 410, 150, 54);
    ctx.strokeRect(550, 410, 150, 54);
    ctx.strokeRect(718, 410, 180, 54);
    ctx.fillStyle = '#f26a16';
    ctx.font = '500 20px monospace';
    ctx.fillText('EMAIL  ↗', 411, 444);
    ctx.fillText('GITHUB ↗', 576, 444);
    ctx.fillText('LINKEDIN ↗', 742, 444);

    ctx.strokeStyle = '#493126';
    ctx.beginPath();
    ctx.moveTo(0, 548);
    ctx.lineTo(1024, 548);
    ctx.stroke();
    ctx.fillStyle = '#8d7467';
    ctx.font = '500 17px monospace';
    ctx.fillText('JUSTINE RHEY TAMBONG', 38, 600);
    ctx.textAlign = 'right';
    ctx.fillText('FULL-STACK / SOFTWARE', 986, 600);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, [portrait]);

  useEffect(() => () => cardFace.dispose(), [cardFace]);

  useEffect(() => {
    const timer = window.setInterval(invalidate, 50);
    return () => window.clearInterval(timer);
  }, [invalidate]);

  useFrame(({ clock }) => {
    if (!card.current) return;
    const sway = Math.sin(clock.elapsedTime * 0.8) * 0.12;
    card.current.rotation.set(0.03, sway * 0.45, sway);
    card.current.position.x = Math.sin(sway) * 0.45;
  });

  return (
    <>
      <ambientLight intensity={2.4} />
      <directionalLight position={[3, 5, 4]} intensity={2} />

      <group position={[0, 1.65, 0]}>
        <mesh position={[-0.72, 0.1, 0]} rotation={[0, 0, -0.28]}>
          <boxGeometry args={[0.24, 3.7, 0.055]} />
          <meshStandardMaterial color="#f26a16" roughness={0.72} />
        </mesh>
        <mesh position={[0.72, 0.1, 0]} rotation={[0, 0, 0.28]}>
          <boxGeometry args={[0.24, 3.7, 0.055]} />
          <meshStandardMaterial color="#f26a16" roughness={0.72} />
        </mesh>
      </group>

      <group ref={card} position={[0, -1.38, 0]}>
        <mesh position={[0, 1.62, 0]}>
          <boxGeometry args={[0.34, 0.42, 0.16]} />
          <meshStandardMaterial color="#a6a6a6" metalness={0.55} roughness={0.32} />
        </mesh>
        <mesh>
          <boxGeometry args={[3.7, 2.35, 0.16]} />
          <meshStandardMaterial color="#17110e" roughness={0.78} />
        </mesh>
        <mesh position={[0, 0, 0.086]}>
          <planeGeometry args={[3.62, 2.27]} />
          <meshBasicMaterial map={cardFace} toneMapped={false} />
        </mesh>
      </group>
    </>
  );
}

export default function LightweightLanyard({ profilePhoto = '/images/portrait-bitmap.png' }) {
  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 34 }}
        dpr={0.75}
        frameloop="demand"
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <Scene profilePhoto={profilePhoto} />
      </Canvas>
    </div>
  );
}
