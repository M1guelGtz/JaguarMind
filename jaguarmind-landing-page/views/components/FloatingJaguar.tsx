"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const FloatingJaguarCanvas = dynamic(() => import("./FloatingJaguarCanvas"), {
  ssr: false,
});

export default function FloatingJaguar() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Stays on the edges — doesn't block content
  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["85%", "8%", "88%", "5%", "90%", "82%"]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["25%", "40%", "30%", "55%", "35%", "45%"]
  );
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 8, -5]);
  const scaleVal = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.8, 1],
    [0.7, 0.9, 0.8, 1, 0.75]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 0.8, 0.8, 0]
  );

  const size = isMobile ? 160 : 240;

  return (
    <motion.div
      className="fixed z-30 pointer-events-none"
      style={{
        left: x,
        top: y,
        rotate,
        scale: scaleVal,
        opacity,
        width: size,
        height: size,
        translateX: "-50%",
        translateY: "-50%",
        filter: "drop-shadow(0 0 25px rgba(245,158,11,0.35)) drop-shadow(0 0 50px rgba(245,158,11,0.12))",
      }}
    >
      <FloatingJaguarCanvas />
    </motion.div>
  );
}
