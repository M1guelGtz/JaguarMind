"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

function generateEyes(count: number): {
  positions: Float32Array;
  colors: Float32Array;
  isPupil: Uint8Array;
} {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const isPupil = new Uint8Array(count);
  let idx = 0;

  const eyeSpacing = 1.4;
  const eyeRx = 0.75;
  const eyeRy = 0.32;

  const amber = new THREE.Color("#f59e0b");
  const gold = new THREE.Color("#fbbf24");
  const orange = new THREE.Color("#ff8c00");
  const darkAmber = new THREE.Color("#b45309");
  const brightYellow = new THREE.Color("#fde047");
  const pupilColor = new THREE.Color("#1a0a00");
  const irisEdge = new THREE.Color("#92400e");

  for (let eye = 0; eye < 2; eye++) {
    const cx = eye === 0 ? -eyeSpacing / 2 : eyeSpacing / 2;
    const cy = 0;

    // Iris fill
    const irisN = Math.floor(count * 0.28);
    for (let i = 0; i < irisN && idx < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random());
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const almondFactor = Math.pow(Math.abs(sinA), 0.15);
      const x = cx + cosA * r * eyeRx;
      const y = cy + sinA * r * eyeRy * almondFactor;

      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = (Math.random() - 0.5) * 0.03;

      const dist = Math.sqrt((cosA * r) ** 2 + (sinA * r * almondFactor) ** 2);
      const edgeFade = Math.min(1, dist * 1.2);
      const rnd = Math.random();
      let c: THREE.Color;
      if (edgeFade > 0.85) {
        c = irisEdge.clone().lerp(darkAmber, rnd * 0.5);
      } else if (edgeFade > 0.5) {
        c = amber.clone().lerp(orange, rnd * 0.6);
      } else {
        c = gold.clone().lerp(brightYellow, rnd * 0.7);
      }
      colors[idx * 3] = c.r;
      colors[idx * 3 + 1] = c.g;
      colors[idx * 3 + 2] = c.b;
      idx++;
    }

    // Pupil slit
    const pupilN = Math.floor(count * 0.06);
    for (let i = 0; i < pupilN && idx < count; i++) {
      const py = (Math.random() - 0.5) * eyeRy * 1.6;
      const slitWidth = 0.05 * (1 - Math.pow(Math.abs(py) / (eyeRy * 0.8), 2));
      const px = (Math.random() - 0.5) * Math.max(0.01, slitWidth);

      positions[idx * 3] = cx + px;
      positions[idx * 3 + 1] = cy + py;
      positions[idx * 3 + 2] = (Math.random() - 0.5) * 0.015;
      isPupil[idx] = 1;

      colors[idx * 3] = pupilColor.r;
      colors[idx * 3 + 1] = pupilColor.g;
      colors[idx * 3 + 2] = pupilColor.b;
      idx++;
    }

    // Radial fibers
    const fiberN = Math.floor(count * 0.04);
    for (let i = 0; i < fiberN && idx < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.08 + Math.random() * 0.7;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const almondFactor = Math.pow(Math.abs(sinA), 0.15);
      const x = cx + cosA * r * eyeRx * 0.85;
      const y = cy + sinA * r * eyeRy * almondFactor * 0.85;
      const normX = (x - cx) / eyeRx;
      const normY = (y - cy) / eyeRy;
      if (normX * normX + normY * normY > 1) { i--; continue; }

      positions[idx * 3] = x + (Math.random() - 0.5) * 0.012;
      positions[idx * 3 + 1] = y + (Math.random() - 0.5) * 0.006;
      positions[idx * 3 + 2] = (Math.random() - 0.5) * 0.02;

      const rnd = Math.random();
      const c = orange.clone().lerp(gold, rnd);
      colors[idx * 3] = c.r;
      colors[idx * 3 + 1] = c.g;
      colors[idx * 3 + 2] = c.b;
      idx++;
    }

    // Eye outline
    const outlineN = Math.floor(count * 0.03);
    for (let i = 0; i < outlineN && idx < count; i++) {
      const t = (i / outlineN) * Math.PI * 2;
      const cosT = Math.cos(t);
      const sinT = Math.sin(t);
      const almondY = Math.pow(Math.abs(sinT), 0.7) * Math.sign(sinT);

      positions[idx * 3] = cx + cosT * eyeRx * (1 + (Math.random() - 0.5) * 0.06);
      positions[idx * 3 + 1] = cy + almondY * eyeRy * (1 + (Math.random() - 0.5) * 0.08);
      positions[idx * 3 + 2] = (Math.random() - 0.5) * 0.015;

      const c = darkAmber.clone().lerp(irisEdge, Math.random() * 0.5);
      colors[idx * 3] = c.r;
      colors[idx * 3 + 1] = c.g;
      colors[idx * 3 + 2] = c.b;
      idx++;
    }

    // Glow
    const glowN = Math.floor(count * 0.05);
    for (let i = 0; i < glowN && idx < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.9 + Math.random() * 0.6;
      positions[idx * 3] = cx + Math.cos(angle) * r * eyeRx * 0.6 + (Math.random() - 0.5) * 0.08;
      positions[idx * 3 + 1] = cy + Math.sin(angle) * r * eyeRy * 1.1 + (Math.random() - 0.5) * 0.06;
      positions[idx * 3 + 2] = (Math.random() - 0.5) * 0.1;

      const c = amber.clone().lerp(darkAmber, 0.3 + Math.random() * 0.5);
      colors[idx * 3] = c.r * 0.5;
      colors[idx * 3 + 1] = c.g * 0.35;
      colors[idx * 3 + 2] = c.b * 0.15;
      idx++;
    }
  }

  // Fill remaining
  while (idx < count) {
    const angle = Math.random() * Math.PI * 2;
    const r = 2 + Math.random() * 1.5;
    positions[idx * 3] = Math.cos(angle) * r * 0.7;
    positions[idx * 3 + 1] = (Math.random() - 0.5) * 1.2;
    positions[idx * 3 + 2] = (Math.random() - 0.5) * 0.3;

    const c = amber.clone().multiplyScalar(0.12);
    colors[idx * 3] = c.r;
    colors[idx * 3 + 1] = c.g;
    colors[idx * 3 + 2] = c.b;
    idx++;
  }

  return { positions, colors, isPupil };
}

function Particles() {
  const irisRef = useRef<THREE.Points>(null!);
  const irisMatRef = useRef<THREE.PointsMaterial>(null!);
  const pupilPointsRef = useRef<THREE.Points>(null!);
  const pupilMatRef = useRef<THREE.PointsMaterial>(null!);
  const count = 4000;

  const { irisPos, irisCols, pupilPos, pupilN, irisN } = useMemo(() => {
    const { positions, colors, isPupil } = generateEyes(count);
    const ip: number[] = [], ic: number[] = [], pp: number[] = [];

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3], y = positions[i * 3 + 1], z = positions[i * 3 + 2];
      if (isPupil[i]) {
        pp.push(x, y, z);
      } else {
        ip.push(x, y, z);
        ic.push(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]);
      }
    }
    return {
      irisPos: new Float32Array(ip), irisCols: new Float32Array(ic),
      pupilPos: new Float32Array(pp), pupilN: pp.length / 3, irisN: ip.length / 3,
    };
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (irisRef.current) {
      irisRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      irisRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.02);
    }
    if (irisMatRef.current) {
      irisMatRef.current.size = 0.028 + Math.sin(t * 1.2) * 0.005;
      irisMatRef.current.opacity = 0.88 + Math.sin(t * 0.7) * 0.1;
    }
    if (pupilPointsRef.current) {
      pupilPointsRef.current.rotation.y = irisRef.current?.rotation.y ?? 0;
      pupilPointsRef.current.scale.copy(irisRef.current?.scale ?? new THREE.Vector3(1, 1, 1));
    }
    if (pupilMatRef.current) {
      pupilMatRef.current.size = 0.035 + Math.sin(t * 2) * 0.005;
      pupilMatRef.current.opacity = 0.92 + Math.sin(t * 1.5) * 0.05;
    }
  });

  return (
    <>
      <points ref={irisRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[irisPos, 3]} count={irisN} />
          <bufferAttribute attach="attributes-color" args={[irisCols, 3]} count={irisN} />
        </bufferGeometry>
        <pointsMaterial ref={irisMatRef} size={0.028} vertexColors transparent opacity={0.88}
          sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points ref={pupilPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pupilPos, 3]} count={pupilN} />
        </bufferGeometry>
        <pointsMaterial ref={pupilMatRef} size={0.035} color="#0a0400" transparent opacity={0.92}
          sizeAttenuation depthWrite={false} blending={THREE.NormalBlending} />
      </points>
    </>
  );
}

export default function FloatingJaguarCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} gl={{ alpha: true, antialias: false }}
      style={{ background: "transparent" }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />
        <pointLight position={[2, 1, 3]} color="#ff6b00" intensity={0.8} />
        <pointLight position={[-2, -0.5, 2]} color="#f59e0b" intensity={0.4} />
        <Particles />
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}
