"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const JaguarScene = dynamic(() => import("./JaguarScene"), { ssr: false });

const TITLE_TOP = "JAGUAR";
const TITLE_BOTTOM = "MIND";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollValueRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Sync Framer Motion's scroll value into a plain ref for R3F
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollValueRef.current = v;
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-16 sm:pb-24"
    >
      {/* 3D Jaguar — disperses on scroll */}
      <div className="absolute inset-0 z-0">
        <JaguarScene scrollRef={scrollValueRef} />
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent via-40% to-black/90 pointer-events-none" />

      {/* Neon ambient glow */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-[150px]" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#ff6b00]/[0.03] blur-[100px]" />
      </div>

      {/* Text content — anchored to the bottom */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full"
        style={{ opacity, scale, y }}
      >
        {/* Small label above title */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-accent/70 font-medium">
            Web3 Platform
          </span>
        </motion.div>

        {/* Title — two lines */}
        <h1 style={{ perspective: "1000px" }}>
          <div className="overflow-hidden">
            {TITLE_TOP.split("").map((char, i) => (
              <motion.span
                key={`top-${i}`}
                className="inline-block text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.3 + i * 0.05,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <span className="bg-gradient-to-b from-accent to-accent-dark bg-clip-text text-transparent">
                  {char}
                </span>
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden -mt-1 sm:-mt-2">
            {TITLE_BOTTOM.split("").map((char, i) => (
              <motion.span
                key={`bot-${i}`}
                className="inline-block text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.6 + i * 0.05,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-base sm:text-lg lg:text-xl text-text-muted max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Where innovation meets the wild.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <a
            href="#community"
            className="px-7 py-2.5 rounded-full bg-gradient-to-r from-accent to-accent-dark text-black font-semibold text-sm hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-shadow"
          >
            Explore Network
          </a>
          <a
            href="#team"
            className="px-7 py-2.5 rounded-full border border-white/[0.12] text-foreground text-sm hover:border-accent/40 hover:text-accent transition-colors"
          >
            Meet the Team
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-5 h-5 text-text-muted mx-auto"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
