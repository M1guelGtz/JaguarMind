"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface JaguarParticlesProps {
  scrollRef: React.MutableRefObject<number>;
}

// Generates a pair of intense jaguar eyes
function generateEyes(count: number): {
  positions: Float32Array;
  colors: Float32Array;
  isPupil: Uint8Array;
} {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const isPupil = new Uint8Array(count);
  let idx = 0;

  const eyeSpacing = 1.6; // distance between eye centers
  const eyeRx = 0.9;      // horizontal radius (wide almond)
  const eyeRy = 0.38;     // vertical radius (narrow slit)

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

    // --- IRIS (main eye fill) — almond shape ---
    const irisN = Math.floor(count * 0.28);
    for (let i = 0; i < irisN && idx < count; i++) {
      // Almond shape: use parametric with sharpened ends
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()); // sqrt for uniform area
      // Almond factor: compress at horizontal extremes
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      // Sharpen the tips of the almond
      const almondFactor = Math.pow(Math.abs(sinA), 0.15);
      const x = cx + cosA * r * eyeRx;
      const y = cy + sinA * r * eyeRy * almondFactor;
      const z = (Math.random() - 0.5) * 0.04;

      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = z;

      // Color: radial gradient from bright center to dark edge
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

    // --- PUPIL — vertical slit ---
    const pupilN = Math.floor(count * 0.06);
    for (let i = 0; i < pupilN && idx < count; i++) {
      // Vertical slit: very narrow X, tall Y
      const py = (Math.random() - 0.5) * eyeRy * 1.6;
      // Width narrows toward top and bottom
      const slitWidth = 0.06 * (1 - Math.pow(Math.abs(py) / (eyeRy * 0.8), 2));
      const px = (Math.random() - 0.5) * Math.max(0.01, slitWidth);
      const pz = (Math.random() - 0.5) * 0.02;

      positions[idx * 3] = cx + px;
      positions[idx * 3 + 1] = cy + py;
      positions[idx * 3 + 2] = pz;
      isPupil[idx] = 1;

      colors[idx * 3] = pupilColor.r;
      colors[idx * 3 + 1] = pupilColor.g;
      colors[idx * 3 + 2] = pupilColor.b;
      idx++;
    }

    // --- IRIS RADIAL FIBERS — streaks from pupil outward ---
    const fiberN = Math.floor(count * 0.05);
    for (let i = 0; i < fiberN && idx < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.08 + Math.random() * 0.7;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const almondFactor = Math.pow(Math.abs(sinA), 0.15);
      const x = cx + cosA * r * eyeRx * 0.85;
      const y = cy + sinA * r * eyeRy * almondFactor * 0.85;
      // Check if inside the almond shape
      const normX = (x - cx) / eyeRx;
      const normY = (y - cy) / eyeRy;
      if (normX * normX + normY * normY > 1) { i--; continue; }

      positions[idx * 3] = x + (Math.random() - 0.5) * 0.015;
      positions[idx * 3 + 1] = y + (Math.random() - 0.5) * 0.008;
      positions[idx * 3 + 2] = (Math.random() - 0.5) * 0.03;

      const rnd = Math.random();
      const c = orange.clone().lerp(gold, rnd);
      colors[idx * 3] = c.r;
      colors[idx * 3 + 1] = c.g;
      colors[idx * 3 + 2] = c.b;
      idx++;
    }

    // --- EYE OUTLINE — sharp almond border ---
    const outlineN = Math.floor(count * 0.04);
    for (let i = 0; i < outlineN && idx < count; i++) {
      const t = (i / outlineN) * Math.PI * 2;
      const cosT = Math.cos(t);
      const sinT = Math.sin(t);
      // Almond: sharpen at horizontal tips
      const almondY = Math.pow(Math.abs(sinT), 0.7) * Math.sign(sinT);
      const x = cx + cosT * eyeRx * (1 + (Math.random() - 0.5) * 0.06);
      const y = cy + almondY * eyeRy * (1 + (Math.random() - 0.5) * 0.08);

      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = (Math.random() - 0.5) * 0.02;

      const c = darkAmber.clone().lerp(irisEdge, Math.random() * 0.5);
      colors[idx * 3] = c.r;
      colors[idx * 3 + 1] = c.g;
      colors[idx * 3 + 2] = c.b;
      idx++;
    }

    // --- GLOW — particles radiating outward from eye ---
    const glowN = Math.floor(count * 0.06);
    for (let i = 0; i < glowN && idx < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.9 + Math.random() * 0.7;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const x = cx + cosA * r * eyeRx * 0.65;
      const y = cy + sinA * r * eyeRy * 1.2;

      positions[idx * 3] = x + (Math.random() - 0.5) * 0.1;
      positions[idx * 3 + 1] = y + (Math.random() - 0.5) * 0.08;
      positions[idx * 3 + 2] = (Math.random() - 0.5) * 0.15;

      // Faint amber glow
      const rnd = Math.random();
      const c = amber.clone().lerp(darkAmber, 0.3 + rnd * 0.5);
      colors[idx * 3] = c.r * 0.6;
      colors[idx * 3 + 1] = c.g * 0.4;
      colors[idx * 3 + 2] = c.b * 0.2;
      idx++;
    }

    // --- UPPER EYELID SHADOW — hint of fur/face above ---
    const lidN = Math.floor(count * 0.01);
    for (let i = 0; i < lidN && idx < count; i++) {
      const t = -0.8 + Math.random() * 1.6;
      positions[idx * 3] = cx + t * eyeRx * 0.7;
      positions[idx * 3 + 1] = cy + eyeRy * 0.8 + Math.random() * 0.15 + Math.abs(t) * 0.08;
      positions[idx * 3 + 2] = (Math.random() - 0.5) * 0.04;

      colors[idx * 3] = 0.08;
      colors[idx * 3 + 1] = 0.04;
      colors[idx * 3 + 2] = 0.01;
      idx++;
    }
  }

  // Fill remaining — very subtle ambient dust
  while (idx < count) {
    const angle = Math.random() * Math.PI * 2;
    const r = 2.5 + Math.random() * 2;
    positions[idx * 3] = Math.cos(angle) * r * 0.8;
    positions[idx * 3 + 1] = (Math.random() - 0.5) * 1.5;
    positions[idx * 3 + 2] = (Math.random() - 0.5) * 0.5;

    const c = amber.clone().multiplyScalar(0.15);
    colors[idx * 3] = c.r;
    colors[idx * 3 + 1] = c.g;
    colors[idx * 3 + 2] = c.b;
    idx++;
  }

  return { positions, colors, isPupil };
}

function generateDispersedPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 3 + Math.random() * 6;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + Math.random() * 2;
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

export default function JaguarParticles({ scrollRef }: JaguarParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.PointsMaterial>(null!);
  const pupilRef = useRef<THREE.Points>(null!);
  const pupilMatRef = useRef<THREE.PointsMaterial>(null!);

  const particleCount = 8000;

  const {
    irisOriginal, irisDispersed, irisColors, irisCount,
    pupilOriginal, pupilDispersed, pupilCount,
  } = useMemo(() => {
    const { positions, colors, isPupil } = generateEyes(particleCount);

    const irisPos: number[] = [];
    const irisCols: number[] = [];
    const pupilPos: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = positions[i * 3], y = positions[i * 3 + 1], z = positions[i * 3 + 2];
      if (isPupil[i]) {
        pupilPos.push(x, y, z);
      } else {
        irisPos.push(x, y, z);
        irisCols.push(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]);
      }
    }

    const iC = irisPos.length / 3;
    const pC = pupilPos.length / 3;

    return {
      irisOriginal: new Float32Array(irisPos),
      irisDispersed: generateDispersedPositions(iC),
      irisColors: new Float32Array(irisCols),
      irisCount: iC,
      pupilOriginal: new Float32Array(pupilPos),
      pupilDispersed: generateDispersedPositions(pC),
      pupilCount: pC,
    };
  }, [particleCount]);

  const irisLive = useMemo(() => new Float32Array(irisOriginal.length), [irisOriginal]);
  const pupilLive = useMemo(() => new Float32Array(pupilOriginal.length), [pupilOriginal]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scroll = scrollRef.current;
    const disperse = Math.min(1, Math.max(0, scroll * 2.2));

    // Lerp iris
    const irisGeo = pointsRef.current?.geometry;
    if (irisGeo) {
      const posAttr = irisGeo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < irisCount * 3; i++) {
        irisLive[i] = irisOriginal[i] + (irisDispersed[i] - irisOriginal[i]) * disperse;
      }
      posAttr.array.set(irisLive);
      posAttr.needsUpdate = true;
    }

    // Lerp pupils
    const pupilGeo = pupilRef.current?.geometry;
    if (pupilGeo) {
      const posAttr = pupilGeo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < pupilCount * 3; i++) {
        pupilLive[i] = pupilOriginal[i] + (pupilDispersed[i] - pupilOriginal[i]) * disperse;
      }
      posAttr.array.set(pupilLive);
      posAttr.needsUpdate = true;
    }

    // Subtle breathing animation
    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(t * 0.15) * 0.03 * (1 - disperse);
      pointsRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.015 * (1 - disperse));
    }

    if (materialRef.current) {
      materialRef.current.size = (0.025 + Math.sin(t * 1.5) * 0.004) * (1 - disperse * 0.3);
      materialRef.current.opacity = (0.9 + Math.sin(t * 0.7) * 0.08) * (1 - disperse * 0.6);
    }

    if (pupilRef.current) {
      pupilRef.current.rotation.y = pointsRef.current?.rotation.y ?? 0;
      pupilRef.current.scale.copy(pointsRef.current?.scale ?? new THREE.Vector3(1, 1, 1));
    }
    if (pupilMatRef.current) {
      pupilMatRef.current.size = (0.03 + Math.sin(t * 2) * 0.005) * (1 - disperse * 0.4);
      pupilMatRef.current.opacity = (0.95 + Math.sin(t * 1.5) * 0.05) * (1 - disperse * 0.8);
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(irisOriginal), 3]}
            count={irisCount}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[irisColors, 3]}
            count={irisCount}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          size={0.025}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={pupilRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(pupilOriginal), 3]}
            count={pupilCount}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={pupilMatRef}
          size={0.03}
          color="#0a0400"
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </>
  );
}
