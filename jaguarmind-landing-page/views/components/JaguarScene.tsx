"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import JaguarParticles from "./JaguarParticles";

interface JaguarSceneProps {
  scrollRef: React.MutableRefObject<number>;
}

export default function JaguarScene({ scrollRef }: JaguarSceneProps) {
  return (
    <div className="absolute inset-0 z-0" aria-label="3D jaguar eyes">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          <pointLight position={[3, 2, 4]} color="#ff6b00" intensity={0.8} />
          <pointLight position={[-3, -1, 3]} color="#f59e0b" intensity={0.4} />
          <pointLight position={[0, 0, 2]} color="#ff8c00" intensity={0.3} />
          <JaguarParticles scrollRef={scrollRef} />
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  );
}
