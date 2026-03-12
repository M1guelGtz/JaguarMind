"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function NeonBackground() {
  const { scrollYProgress } = useScroll();

  // Neon orbs move as user scrolls
  const orb1X = useTransform(scrollYProgress, [0, 1], ["10%", "80%"]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["20%", "70%"]);
  const orb2X = useTransform(scrollYProgress, [0, 1], ["80%", "20%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["60%", "30%"]);
  const orb3X = useTransform(scrollYProgress, [0, 1], ["50%", "30%"]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], ["80%", "10%"]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Animated neon orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          left: orb1X,
          top: orb1Y,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.02) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          left: orb2X,
          top: orb2Y,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(255,107,0,0.015) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          left: orb3X,
          top: orb3Y,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(251,191,36,0.05) 0%, rgba(251,191,36,0.01) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Horizontal neon lines */}
      <div className="absolute top-[20%] left-0 right-0 h-px neon-line" />
      <div className="absolute top-[50%] left-0 right-0 h-px neon-line" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[80%] left-0 right-0 h-px neon-line" style={{ animationDelay: "4s" }} />

      {/* Corner neon accents */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-accent/[0.04] to-transparent" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tl from-accent/[0.04] to-transparent" />

      {/* Vertical neon streaks */}
      <motion.div
        className="absolute top-0 bottom-0 w-px left-[15%]"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.06), transparent)",
        }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 bottom-0 w-px right-[15%]"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(255,107,0,0.06), transparent)",
        }}
        animate={{ opacity: [0.5, 0.2, 0.5] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
    </div>
  );
}
